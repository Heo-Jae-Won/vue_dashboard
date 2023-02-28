import { createStore } from "vuex";
import ModuleUser from "./modules/userStore";
// export interface RootState {
//   ModuleUser: ModuleuserState;
// }

export default createStore({
  modules: { ModuleUser },
});
