import { Router } from "vue-router";
const notAllowedRouter: Array<string> = ["insert"];

export function setupGuard(router: Router) {
  authenticateGuard(router);
}

 //배열로 검사안할 path저장하고 안 할 path만 router 검사
      //안할 path: "/board/list",
function authenticateGuard(router: Router) {
  if (localStorage.getItem("loginUser")==="") {
    router.beforeEach((to, from, next) => {
     
      if (notAllowedRouter.includes(to.name as string)) {
        next(false);
        alert("로그인이 필요합니다.");
      }
      next();
    });
  }
}

//로그인 안 했을 때는 등록화면을 못가도, 로그인을 했을 때는 게시판등록화면으로 가능하게끔
