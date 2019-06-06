import "../styles/index.scss";
import { city } from "../city";
import { showVideo } from "./showVideoCallback";
const earth = new Earth("webgl");

function callbackFunc(name) {
  console.log(name);
  showVideo("./images/videoplayback.mp4");
}

city.map(item =>
  earth.newCity(item.name, { lat: item.lat, lon: item.lon }, callbackFunc)
);

$(".play-btn").click(function() {
  $(".play-btn").addClass("end");
  setTimeout(() => {
    $(".play-btn").css("display", "none");
    //earth.defaultCamera();
    setTimeout(() => {
      earth.showCity("Союз «Уральская ТПП»", 2000);
    }, 1000);
  }, 2100);
});
