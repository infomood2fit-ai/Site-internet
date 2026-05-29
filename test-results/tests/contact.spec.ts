import { test, expect } from '@playwright/test';

test.describe('Formulaire Contact', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    // Scroller jusqu'au formulaire
    await page.locator('#formulaire').scrollIntoViewIfNeeded();
  });

  // ── TEST 1 : Envoi réussi ──────────────────────────────────
  test('envoi réussi affiche le message de confirmation', async ({ page }) => {
    // Remplir le formulaire
    await page.fill('input[placeholder="Alex Martin"]', 'Test User');
    await page.fill('input[placeholder="alex@exemple.com"]', 'test@mood2fit.com');
    await page.selectOption('select', 'Question générale');
    await page.fill('textarea', 'Ceci est un message de test avec plus de 20 caractères.');

    // Intercepter l'appel API pour simuler un succès
    await page.route('/api/contact', async route => {
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    // Soumettre
    await page.click('button[type="submit"]');

    // Vérifier le message de succès
    await expect(page.getByText('Message envoyé.')).toBeVisible({ timeout: 5000 });
  });

  // ── TEST 2 : Validation champs vides ──────────────────────
  test('erreurs de validation sur champs vides', async ({ page }) => {
    await page.click('button[type="submit"]');

    // Les messages d'erreur doivent apparaître
    await expect(page.getByText('Au moins 2 caractères')).toBeVisible();
    await expect(page.getByText('Email invalide')).toBeVisible();
  });

  // ── TEST 3 : Email invalide ────────────────────────────────
  test('email invalide affiche une erreur', async ({ page }) => {
    await page.fill('input[placeholder="Alex Martin"]', 'Test User');
    await page.fill('input[placeholder="alex@exemple.com"]', 'email-invalide');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Email invalide')).toBeVisible();
  });

  // ── TEST 4 : Message trop court ────────────────────────────
  test('message trop court affiche une erreur', async ({ page }) => {
    await page.fill('input[placeholder="Alex Martin"]', 'Test User');
    await page.fill('input[placeholder="alex@exemple.com"]', 'test@mood2fit.app');
    await page.selectOption('select', 'Question générale');
    await page.fill('textarea', 'Court');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Au moins 20 caractères')).toBeVisible();
  });

  // ── TEST 5 : Erreur serveur affiche un message ─────────────
  test('erreur serveur affiche un message visible', async ({ page }) => {
    await page.fill('input[placeholder="Alex Martin"]', 'Test User');
    await page.fill('input[placeholder="alex@exemple.com"]', 'test@mood2fit.app');
    await page.selectOption('select', 'Question générale');
    await page.fill('textarea', 'Ceci est un message de test avec plus de 20 caractères.');

    // Simuler une erreur serveur 500
    await page.route('/api/contact', async route => {
      await route.fulfill({ status: 500, body: JSON.stringify({ error: 'Erreur serveur' }) });
    });

    await page.click('button[type="submit"]');

    await expect(page.getByText(/Une erreur s'est produite/)).toBeVisible({ timeout: 5000 });
  });

  // ── TEST 6 : Rate limit affiche un message ─────────────────
  test('rate limit 429 affiche un message visible', async ({ page }) => {
    await page.fill('input[placeholder="Alex Martin"]', 'Test User');
    await page.fill('input[placeholder="alex@exemple.com"]', 'test@mood2fit.app');
    await page.selectOption('select', 'Question générale');
    await page.fill('textarea', 'Ceci est un message de test avec plus de 20 caractères.');

    // Simuler un rate limit
    await page.route('/api/contact', async route => {
      await route.fulfill({ status: 429, body: JSON.stringify({ error: 'Trop de messages' }) });
    });

    await page.click('button[type="submit"]');

    await expect(page.getByText(/Trop de messages/)).toBeVisible({ timeout: 5000 });
  });

  // ── TEST 7 : Bouton désactivé pendant l'envoi ──────────────
  test('bouton désactivé pendant la soumission', async ({ page }) => {
    await page.fill('input[placeholder="Alex Martin"]', 'Test User');
    await page.fill('input[placeholder="alex@exemple.com"]', 'test@mood2fit.app');
    await page.selectOption('select', 'Question générale');
    await page.fill('textarea', 'Ceci est un message de test avec plus de 20 caractères.');

    // Ralentir la réponse pour voir l'état de chargement
    await page.route('/api/contact', async route => {
      await new Promise(r => setTimeout(r, 1000));
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.click('button[type="submit"]');

    // Le bouton doit être désactivé pendant l'envoi
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    await expect(page.getByText('Envoi en cours…')).toBeVisible();
  });

});