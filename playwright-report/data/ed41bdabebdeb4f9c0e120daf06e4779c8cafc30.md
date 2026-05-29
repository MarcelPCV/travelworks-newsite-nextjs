# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navbar-menu.spec.ts >> Navbar mega menu >> opens Products mega menu on hover and switches category content
- Location: e2e\navbar-menu.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Backoffice System' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Backoffice System' })

```

```yaml
- paragraph: Are you in the right place? Choose your language to see content specific to your location.
- button "Choose your location language": English (Global)
- button "Continue"
- button "Close"
- paragraph: Focus on your next breakthrough. We'll handle the heavy lifting.
- button "Learn more"
- button "Dismiss announcement"
- banner:
  - navigation:
    - link "TravelWorks":
      - /url: /
    - list:
      - listitem:
        - button "Products" [expanded]
      - listitem:
        - button "About Us"
      - listitem:
        - button "Training"
    - button "Open search"
    - button "ASK FOR A DEMO"
    - button "LOG IN"
    - button "English (Global)"
  - menu "Products":
    - paragraph: Discover TravelWorks, the ultimate software platform for modern travel agencies.
    - menuitem "Features"
    - menuitem "Benefits"
    - menuitem "Backoffice System"
    - menuitem "Trip Details"
    - menuitem "Tour Management"
    - menuitem "TourOnline"
    - menuitem "CRM Tools"
    - menuitem "Integrations"
    - menuitem "Dashboard Reports"
    - menuitem "Customizations"
    - menuitem "Ask for a Demo"
- main:
  - heading "TravelWorks Travel Management Platform" [level=1]
  - region "News":
    - text: News
    - paragraph: Travelworks launches new tools to master accounting software
    - link "Call 1 877 282-4556":
      - /url: tel:1 877 282-4556
      - text: 1 877 282-4556
  - text: "Request failed: 502 Bad Gateway"
  - region "Technology Tailored to Travel Industry":
    - heading "Technology Tailored to Travel Industry" [level=2]:
      - text: Technology
      - strong: Tailored
      - text: to Travel Industry
    - article:
      - paragraph: Backoffice Tools
    - article:
      - paragraph: Reservation Management
    - article:
      - paragraph: Strategic Management Tool
    - article:
      - paragraph: Tour management
    - article:
      - paragraph: Online Tour Booking
    - article:
      - paragraph: CRM Tools
    - article:
      - paragraph: Multiple integration
  - region "A pleasant work environment for travel agents, considerable time-saving for accountants and an essential management tool for travel agency managers.":
    - text: Computer Image Placeholder
    - paragraph: + 30
    - paragraph: Years
    - paragraph: 30 Years Stamp Placeholder
    - heading "A pleasant work environment for travel agents, considerable time-saving for accountants and an essential management tool for travel agency managers." [level=2]
  - region "Why TravelWorks?":
    - heading "Why TravelWorks?" [level=2]:
      - text: Why
      - strong: TravelWorks?
    - article:
      - heading "Optimize Invoicing and Accounting" [level=3]
      - paragraph: Generate professional and standardized invoices. Automate invoice creation and maximize your accounting process with good practices.
    - article:
      - heading "Integrated to GDS and Booking Engines" [level=3]
      - paragraph: Connect your current booking engines and reservation flow so processes stay centralized and your team works faster.
    - article:
      - heading "Cloud System, a Turnkey Solution" [level=3]
      - paragraph: Operate from a reliable cloud environment that simplifies maintenance, collaboration, and growth across locations.
    - article:
      - heading "CRM Tool and Integrated Marketing" [level=3]
      - paragraph: Generate additional revenue with targeted campaigns and improve customer service with automated communication.
  - region "TravelWorks for Better Operations":
    - text: Laptop Image Placeholder
    - heading "TravelWorks for Better Operations" [level=2]
    - list "TravelWorks for Better Operations":
      - listitem: Accounting tailored to the travel agency
      - listitem: Improves productivity
      - listitem: Robust and secured
      - listitem: Easy to use and intuitive
    - link "Discover Benefits":
      - /url: "#"
  - region "More than 1,000 Travel Agencies trust us":
    - heading "More than 1,000 Travel Agencies trust us" [level=2]:
      - text: More than
      - strong: 1,000 Travel Agencies
      - text: trust us
    - article:
      - paragraph: Carlson Wagonlit Travel
    - article:
      - paragraph: Ensemble Travel Group
    - article:
      - paragraph: Voyages En Direct
    - article:
      - paragraph: Thomas Cook
    - article:
      - paragraph: Revasol
    - article:
      - paragraph: Voyages Bergeron
    - article:
      - paragraph: Club Voyages
    - article:
      - paragraph: Transat
    - article:
      - paragraph: Vasco Travel
    - article:
      - paragraph: Voyages Plein Soleil
    - article:
      - paragraph: Marlin Travel
    - article:
      - paragraph: Vaisse De Croisiere
    - link "Discover Our Customers":
      - /url: "#"
  - region "Planning a Demo":
    - heading "Planning a Demo" [level=2]
    - text: "Teamwork Image Placeholder Full name:"
    - textbox "Full name:"
    - text: "Email:"
    - textbox "Email:"
    - text: "Phone:"
    - textbox "Phone:"
    - text: "Name of Travel Agency:"
    - textbox "Name of Travel Agency:"
    - text: "Country:"
    - combobox "Country:":
      - option "- Please choose an option -" [selected]
    - button "Ask for Demo"
  - region "News":
    - heading "News" [level=2]
    - 'article "New Itinerary Builder: Seamlessly create a complete itinerary."':
      - paragraph: Featured
      - 'heading "New Itinerary Builder: Seamlessly create a complete itinerary." [level=3]'
    - article "TravelWorks launches new tools to master accounting software":
      - paragraph: Travelworks
      - heading "TravelWorks launches new tools to master accounting software" [level=3]
    - 'article "Information Security: 5 Key Elements for Your Travel Agency"':
      - paragraph: IT Manager
      - 'heading "Information Security: 5 Key Elements for Your Travel Agency" [level=3]'
  - region:
    - text: "Logo Call us:"
    - link "+1 (555) 555-5555":
      - /url: tel:+1 (555) 555-5555
    - text: "Email:"
    - link "hello@example.com":
      - /url: mailto:hello@example.com
    - link "YouTube":
      - /url: "#"
    - link "LinkedIn":
      - /url: "#"
    - link "Facebook":
      - /url: "#"
    - button "Back to top"
  - region "Footer navigation":
    - heading "Footer navigation" [level=2]
    - navigation "Footer navigation":
      - heading "The Solution" [level=3]
      - list:
        - listitem:
          - link "Features":
            - /url: "#"
        - listitem:
          - link "Back Office System":
            - /url: "#"
        - listitem:
          - link "Tour Management":
            - /url: "#"
        - listitem:
          - link "Tour Online":
            - /url: "#"
        - listitem:
          - link "CRM Tools":
            - /url: "#"
        - listitem:
          - link "Multiple Integration":
            - /url: "#"
        - listitem:
          - link "Customizations":
            - /url: "#"
        - listitem:
          - link "Multiple Reports":
            - /url: "#"
      - heading "Benefits" [level=3]
      - list:
        - listitem:
          - link "Cloud Based":
            - /url: "#"
        - listitem:
          - link "Efficient":
            - /url: "#"
        - listitem:
          - link "Scalable":
            - /url: "#"
        - listitem:
          - link "Secure":
            - /url: "#"
        - listitem:
          - link "Smart":
            - /url: "#"
        - listitem:
          - link "Reliable":
            - /url: "#"
        - listitem:
          - link "Evolutionary":
            - /url: "#"
      - heading "Travelworks" [level=3]
      - list:
        - listitem:
          - link "About us":
            - /url: "#"
        - listitem:
          - link "Clients":
            - /url: "#"
        - listitem:
          - link "Partners":
            - /url: "#"
        - listitem:
          - link "Contact":
            - /url: "#"
        - listitem:
          - link "Ask for a demo":
            - /url: "#"
        - listitem:
          - link "Training":
            - /url: "#"
        - listitem:
          - link "Careers":
            - /url: "#"
        - listitem:
          - link "Privacy Policy":
            - /url: "#"
      - heading "News" [level=3]
      - list:
        - listitem:
          - link "All News":
            - /url: "#"
        - listitem:
          - link "Accountant":
            - /url: "#"
        - listitem:
          - link "Agency Owner":
            - /url: "#"
        - listitem:
          - link "IT Manager":
            - /url: "#"
        - listitem:
          - link "Technology":
            - /url: "#"
    - paragraph: © Pc Voyages 2000 Inc. All rights reserved
- alert
- dialog "We value your privacy":
  - text: We value your privacy This site uses cookies to improve your browsing experience, analyze site traffic, and display personalized content. Please review our
  - link "Privacy Policy":
    - /url: "#"
  - text: and
  - link "Cookie Policy":
    - /url: "#"
  - text: for more information.
  - button "Reject All"
  - button "Accept All"
  - button "Customize"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | test.describe('Navbar mega menu', () => {
  4  |   test('opens Products mega menu on hover and switches category content', async ({ page }) => {
  5  |     await page.goto('/en-us');
  6  | 
  7  |     const productsTrigger = page.getByRole('button', { name: 'Products' });
  8  |     await productsTrigger.hover();
  9  | 
  10 |     const megaMenu = page.locator('#products-mega-menu');
  11 |     await expect(megaMenu).toBeVisible();
> 12 |     await expect(page.getByRole('link', { name: 'Backoffice System' })).toBeVisible();
     |                                                                         ^ Error: expect(locator).toBeVisible() failed
  13 | 
  14 |     await page.getByRole('button', { name: 'TourOnline' }).hover();
  15 | 
  16 |     await expect(page.getByRole('link', { name: 'Try It' })).toBeVisible();
  17 |     await expect(page.getByRole('link', { name: 'Backoffice System' })).toHaveCount(0);
  18 |   });
  19 | 
  20 |   test('shows About Us and Training dropdown menus', async ({ page }) => {
  21 |     await page.goto('/en-us');
  22 | 
  23 |     await page.getByRole('button', { name: 'About Us' }).hover();
  24 |     await expect(page.getByRole('menu', { name: 'About Us' })).toBeVisible();
  25 |     await expect(page.getByRole('link', { name: 'Travelworks Company' })).toBeVisible();
  26 | 
  27 |     await page.getByRole('button', { name: 'Training' }).hover();
  28 |     await expect(page.getByRole('menu', { name: 'Training' })).toBeVisible();
  29 |     await expect(page.getByRole('link', { name: 'Knowledge Base' })).toBeVisible();
  30 |   });
  31 | 
  32 |   test('supports keyboard open and escape close for products menu', async ({ page }) => {
  33 |     await page.goto('/en-us');
  34 | 
  35 |     const productsTrigger = page.getByRole('button', { name: 'Products' });
  36 |     await productsTrigger.focus();
  37 |     await page.keyboard.press('ArrowDown');
  38 | 
  39 |     const megaMenu = page.locator('#products-mega-menu');
  40 |     await expect(megaMenu).toBeVisible();
  41 |     await expect(page.getByRole('button', { name: 'Travelworks' })).toBeFocused();
  42 | 
  43 |     await page.keyboard.press('Escape');
  44 |     await expect(megaMenu).not.toBeVisible();
  45 |   });
  46 | });
  47 | 
```