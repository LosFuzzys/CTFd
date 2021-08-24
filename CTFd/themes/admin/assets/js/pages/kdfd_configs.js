import "./main";
import "core/utils";
import "bootstrap/js/dist/tab";
import CTFd from "core/CTFd";


function updateConfigs(event) {
  event.preventDefault();
  const obj = $(this).serializeJSON();
  const params = {};

  Object.keys(obj).forEach(function(x) {
    if (obj[x] === "true") {
      params[x] = true;
    } else if (obj[x] === "false") {
      params[x] = false;
    } else {
      params[x] = obj[x];
    }
  });

  CTFd.api.patch_config_list({}, params).then(function(_response) {
    if (_response.success) {
      window.location.reload();
    } else {
      let errors = _response.errors.value.join("\n");
      ezAlert({
        title: "Error!",
        body: errors,
        button: "Okay"
      });
    }
  });
}

$(() => {
  $(".config-section > form:not(.form-upload, .custom-config-form)").submit(
    updateConfigs
  );
});
