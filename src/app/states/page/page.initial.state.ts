import { PageState } from "./page.state";
import { pageAdapter } from "./page.adapter";

export const pageInitialState: PageState = pageAdapter.getInitialState({
    options: {
      editPages: true,
      editPageId: null
    }
  });