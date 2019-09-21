document.addEventListener("init", function(event) {
  var page = event.target;
  if (page.id === "page1") {
    page.querySelector("#submit-button").onclick = function() {
      console.log(
        page.querySelector("#name").value,
        page.querySelector("#date").value,
        page.querySelector("#css").checked,
        page.querySelector("#html").checked,
        page.querySelector("#javascript").checked,
        page.querySelector("#male").checked,
        page.querySelector("#female").checked,
        page.querySelector("#other").checked,
        page.querySelector("#selector").value
      );
      document
        .querySelector("#myNavigator")
        .pushPage("page2.html", { data: { title: "Profile" } });
    };
  } else if (page.id === "page2") {
    page.querySelector("ons-toolbar .center").innerHTML = page.data.title;
  }
});
