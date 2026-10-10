# ADM-07 Test Plan

Run full Frontend gates and deployed UAT at `https://eduai.giaoducso.org.vn`.

Journey matrix includes:
- authenticate as authorized Admin test actor;
- Overview and every sidebar destination;
- direct URL + back/forward + active route state;
- search/filter/reset/pagination where present;
- detail/drawer/dialog workflows;
- bounded non-financial mutation flows using synthetic/test data where safe;
- refresh and error/empty/loading behavior;
- 320/375/390/412/768/1024/1440 visual checks;
- logout/login and authorization regression.

Verify exact merged remote SHA, CI/deployment result and cleanup. Do not claim runtime checks that were not observed.
