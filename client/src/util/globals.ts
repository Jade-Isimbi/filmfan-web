export const handleError = (error: any) => {
  console.log("====== error FD =====", error);
  switch (error.status) {
    case 401:
      return;
  }
};
