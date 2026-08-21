# Profile QA Checklist

Task: SPR3-009 - Profile QA And Refactor

## Scope

Digital Identity MVP:

- Profile view/edit
- Avatar upload
- Skills add/list/delete
- Portfolio create/list/edit/delete
- Current-user ownership protection

## Manual Checks

- [ ] Login as User A and open `/profile`.
- [ ] Confirm profile fields load without a blank screen.
- [ ] Save headline, bio, website, public slug, and public/private status.
- [ ] Try invalid website and invalid public slug; inline errors must appear.
- [ ] Upload PNG, JPG, or WebP avatar under 2MB; avatar preview must update.
- [ ] Try unsupported avatar type or file over 2MB; error must appear.
- [ ] Add a skill with name, level, and category.
- [ ] Try adding a blank skill; inline error must appear.
- [ ] Delete a skill; list must update and rollback if API fails.
- [ ] Create a portfolio item with title, URL, image URL, dates, and description.
- [ ] Try invalid portfolio URLs and end date before start date; inline errors must appear.
- [ ] Edit a portfolio item and confirm the list reflects the saved values.
- [ ] Delete a portfolio item; list must update and rollback if API fails.
- [ ] Login as User B and confirm User A skills/portfolio are not visible.
- [ ] Directly call User A skill/portfolio IDs as User B; API must return not found or unauthorized.
- [ ] Verify layout remains usable at mobile width, tablet width, and desktop width.

## Automated Checks

- [ ] `Back_End`: `npm test -- profile.service.spec.ts`
- [ ] `Back_End`: `npm test -- avatar-storage.service.spec.ts`
- [ ] `Back_End`: `npm run build`
- [ ] `Front_End`: `npm run build`

## Notes

- Browser automation was previously blocked in this environment by a Windows sandbox `spawn setup refresh` failure; use this checklist for manual browser signoff.
