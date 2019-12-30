import { PageState } from "./page.state";
import { pageAdapter } from "./page.adapter";

/** The initial state for Pages model */
export const pageInitialState: PageState = pageAdapter.getInitialState({
  options: {
    editPages: true,
    editPageId: null
  }
});