export const parseError = (error: any) => {
  try {
    console.log(error.response);

    if (!error.response) {
      return {
        title: "Server is not available",
        text:
          "please try again later" +
          `. Request failed with status code ${error.response.status} `,
      };
    }
    if (typeof error.response.data.description.message === "object") {
      let text = "";
      error.response.data.description.message.forEach((obj) => {
        text += obj;
        text += ", ";
      });

      text = text.slice(0, text.length - 2);
      return {
        title: error.response.data.error,
        text:
          text + `. Request failed with status code ${error.response.status} `,
      };
    } else
      return {
        title: error.response.data.error,
        text:
          error.response.data.description.message +
          `. Request failed with status code ${error.response.status} `,
      };
  } catch (error) {
    return {
      title: "Server is not available",
      text: "please try again later",
    };
  }
};
