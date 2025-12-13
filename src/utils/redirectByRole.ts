export function redirectByRole(role: string, router: any) {
  switch (role) {
    case "priest":
      router.push("/priest/home");
      break;
    case "leader":
      router.push("/leaders/home");
      break;
    case "catechist":
      router.push("/catechist/home");
      break;
    default:
      router.push("/member/home");
  }
}
