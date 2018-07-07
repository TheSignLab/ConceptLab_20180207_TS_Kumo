$(document).ready(function() {
  var _name = $("h1 .fl strong").html();
  var _email = $(
    $($(".icon.email").get(1))
      .parent()
      .get(0)
  ).text();
  var _phone = $(".fw_n.mt3").text();
  var _city = $(
    $($(".icon.pais").get(1))
      .parent()
      .get(0)
  ).text();
  var _age = $(
    $($(".icon.edad").get(1))
      .parent()
      .get(0)
  ).text();
  var _obj = {
    name: _name,
    phone: _phone,
    email: _email,
    age: _age
  };
  var objArray = JSON.parse(localStorage.getItem("AbogadosEspecialistas"));
  objArray.push(_obj);
  localStorage.setItem("AbogadosEspecialistas", JSON.stringify(objArray));
  var _next_href =
    "https://empresa.computrabajo.com.co/" + $(".next").attr("href");
  //window.location.href = _next_href;
  $(".next")[0].click();
});
