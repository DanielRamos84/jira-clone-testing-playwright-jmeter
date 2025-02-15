import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../../pom/loginPage";
import { ProjectsPage } from "../../../pom/projectsPage";

test.use({ storageState: { cookies: [], origins: [] } });
test("Login as Default / Admin user", async ({ page }: { page: Page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  const projectsPage = new ProjectsPage(page);

  await test.step("Navigate to the login page", async (): Promise<void> => {
    await loginPage.navigateTo();
  });

  await test.step("Assert the login page header", async (): Promise<void> => {
    await expect(page).toHaveURL(loginPage.getPageUrl());
    await expect(loginPage.getLoginPageHeader()).toBeVisible();
  });

  await test.step("Assert user select dropdown is visible", async (): Promise<void> => {
    await expect(loginPage.getUserSelectDropDown()).toBeVisible();
  });

  await test.step("Click login button", async (): Promise<void> => {
    await loginPage.clickLoginBtn();
  });

  await test.step("Assert user is in the Projects Page after login", async (): Promise<void> => {
    await expect(page).toHaveURL(projectsPage.getPageUrl());
  });
});
