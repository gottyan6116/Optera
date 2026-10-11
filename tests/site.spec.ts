import { test, expect } from "@playwright/test";

test("curriculum explains all three stages with readable responsive diagrams", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const curriculum = page.locator("#curriculum");
    await expect(curriculum.getByRole("img")).toHaveCount(3);
    await expect(curriculum.getByRole("heading", { level: 3 })).toHaveCount(3);
    for (const diagram of await curriculum.getByRole("img").all()) {
      await expect(diagram).toBeVisible();
      const box = (await diagram.boundingBox())!;
      expect(box.width).toBeGreaterThan(280);
      expect(box.height).toBeGreaterThan(180);
    }
  }
});

test("completed scene transition does not restart the initial entrance", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: "次のシーン" }).click();
  await page.waitForTimeout(850);
  expect(
    await page
      .locator(".scene-composition")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
});

test("autoplay progresses while visible and stops when scrolled away", async ({
  page,
}) => {
  await page.goto("/");
  await page.mouse.move(0, 0);
  const carousel = page.getByRole("region", {
    name: "つくれる可能性を体験する",
  });
  await expect(carousel.getByRole("heading")).toContainText("アプリ", {
    timeout: 12000,
  });
  await page.locator("#roadmap").scrollIntoViewIfNeeded();
  await page.waitForTimeout(9000);
  await expect(carousel.getByRole("heading")).toContainText("アプリ");
  expect(
    await page
      .locator(".scene-device")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
});

test("hero scenes respond to controls and scoped keyboard", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "AIを学ぶ。",
  );
  const carousel = page.getByRole("region", {
    name: "つくれる可能性を体験する",
  });
  await carousel.getByRole("button", { name: "次のシーン" }).click();
  await expect(carousel.getByRole("heading")).toHaveText(
    "AIでアプリを開発する",
  );
  await carousel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(carousel.getByRole("heading")).toHaveText(
    "AIで仕事をもっとスマートに",
  );
  await page.keyboard.press("ArrowRight");
  await expect(carousel.getByRole("heading")).toHaveText(
    "クラウドを使いこなす",
  );
  await page.keyboard.press("ArrowRight");
  await expect(carousel.getByRole("heading")).toHaveText(
    "AIでWebサイトをつくる",
  );
});

test("mobile has no overflow and navigation works", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "メニューを開く" }).click();
  await page
    .getByRole("navigation", { name: "メインナビゲーション" })
    .getByRole("link", { name: "学べること", exact: true })
    .click();
  await expect(page).toHaveURL(/#curriculum/);
});

test("API rejects invalid data and never reports receipt without configuration", async ({
  request,
}) => {
  const invalid = await request.post("/api/contact", { data: {} });
  expect(invalid.status()).toBe(400);
  const valid = await request.post("/api/contact", {
    data: {
      name: "テスト",
      email: "test@example.com",
      objective: "AIを基礎から学びたい",
      experience: "未経験",
      topics: ["AIの基礎"],
      message: "",
      consent: true,
      website: "",
    },
  });
  expect(valid.status()).toBe(503);
  expect((await valid.json()).success).not.toBe(true);
});

test("contact validates locally and states clearly that nothing was submitted", async ({
  page,
}) => {
  const submissions: string[] = [];
  page.on("request", (r) => {
    if (r.url().endsWith("/api/contact")) submissions.push(r.url());
  });
  await page.goto("/contact");
  await page
    .getByRole("button", { name: "入力内容を確認する（確認用）" })
    .click();
  await expect(page.getByLabel("お名前")).toBeFocused();
  await page.getByLabel("お名前").fill("テスト");
  await page.getByLabel("メールアドレス").fill("test@example.com");
  await page
    .getByLabel("いちばん学びたいこと")
    .selectOption("AIを基礎から学びたい");
  await page.getByLabel("現在のAIの経験").selectOption("未経験");
  await page.getByRole("checkbox", { name: /個人情報の取り扱い/ }).check();
  await page
    .getByRole("button", { name: "入力内容を確認する（確認用）" })
    .click();
  await expect(page.locator(".form-status")).toContainText(
    "送信・保存されていません",
  );
  expect(submissions).toEqual([]);
  await expect(
    page.getByRole("heading", { name: "ご相談を受け付けました。" }),
  ).toHaveCount(0);
});

test("reduced motion disables ambient movement and autoplay but keeps controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const carousel = page.getByRole("region", {
    name: "つくれる可能性を体験する",
  });
  expect(
    await page
      .locator(".scene-device")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.waitForTimeout(9000);
  await expect(carousel.getByRole("heading")).toContainText("Webサイト");
  await carousel.getByRole("button", { name: "次のシーン" }).click();
  await expect(carousel.getByRole("heading")).toContainText("アプリ");
});

test("pointer swipe changes scene and focus pauses automatic progression", async ({
  page,
}) => {
  await page.goto("/");
  const stage = page.locator(".showcase-stage");
  const box = (await stage.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, {
    steps: 8,
  });
  await page.mouse.up();
  const carousel = page.getByRole("region", {
    name: "つくれる可能性を体験する",
  });
  await expect(carousel.getByRole("heading")).toContainText("アプリ");
  await carousel.focus();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(9000);
  await expect(carousel.getByRole("heading")).toContainText("アプリ");
});

test("FAQ works and page stays usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "AIを学ぶ",
  );
  const summary = page.locator("summary").first();
  await summary.click();
  await expect(page.locator(".faq-answer").first()).toBeVisible();
  await page
    .getByRole("link", { name: "無料で相談する", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  await context.close();
});

test("server enforces malformed payload, consent, origin and size limits", async ({
  request,
}) => {
  const payload = {
    name: "テスト",
    email: "test@example.com",
    objective: "AIを基礎から学びたい",
    experience: "未経験",
    topics: [],
    message: "",
    consent: true,
    website: "",
  };
  expect(
    (
      await request.post("/api/contact", {
        data: { ...payload, consent: false },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: payload,
        headers: { Origin: "https://unrelated.example" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/contact", {
        data: payload,
        headers: {
          Origin: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100",
        },
      })
    ).status(),
  ).toBe(503);
  expect(
    (
      await request.post("/api/contact", {
        data: "{",
        headers: { "Content-Type": "application/json" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: { ...payload, message: "a".repeat(17000) },
      })
    ).status(),
  ).toBe(413);
  expect(
    (
      await request.post("/api/contact", {
        data: { ...payload, topics: ["unrecognized"] },
      })
    ).status(),
  ).toBe(400);
});

test("holding a touch gesture pauses carousel progression", async ({
  page,
}) => {
  await page.goto("/");
  await page.mouse.move(0, 0);
  const stage = page.locator(".showcase-stage");
  await stage.dispatchEvent("pointerdown", {
    pointerId: 1,
    pointerType: "touch",
    clientX: 900,
    clientY: 400,
  });
  await page.waitForTimeout(9000);
  await expect(
    page
      .getByRole("region", { name: "つくれる可能性を体験する" })
      .getByRole("heading"),
  ).toContainText("Webサイト");
  await stage.dispatchEvent("pointercancel", {
    pointerId: 1,
    pointerType: "touch",
  });
});

test("layouts and all public routes render without application errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/contact", "/privacy"]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    }
  }
  expect(errors).toEqual([]);
});
