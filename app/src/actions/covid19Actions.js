import axios from "axios";
const fips = require("fips-county-codes");

export const SET_SUMMARY = "SET_SUMMARY";
const STATE_TO_FIPS = {
  Alabama: "01",
  Alaska: "02",
  Arizona: "04",
  Arkansas: "05",
  California: "06",
  Colorado: "08",
  Connecticut: "09",
  Delaware: "10",
  "District of Columbia": "11",
  Florida: "12",
  Geogia: "13",
  Hawaii: "15",
  Idaho: "16",
  Illinois: "17",
  Indiana: "18",
  Iowa: "19",
  Kansas: "20",
  Kentucky: "21",
  Louisiana: "22",
  Maine: "23",
  Maryland: "24",
  Massachusetts: "25",
  Michigan: "26",
  Minnesota: "27",
  Mississippi: "28",
  Missouri: "29",
  Montana: "30",
  Nebraska: "31",
  Nevada: "32",
  "New Hampshire": "33",
  "New Jersey": "34",
  "New Mexico": "35",
  "New York": "36",
  "North Carolina": "37",
  "North Dakota": "38",
  Ohio: "39",
  Oklahoma: "40",
  Oregon: "41",
  Pennsylvania: "42",
  "Rhode Island": "44",
  "South Carolina": "45",
  "South Dakota": "46",
  Tennessee: "47",
  Texas: "48",
  Utah: "49",
  Vermont: "50",
  Virginia: "51",
  Washington: "53",
  "West Virginia": "54",
  Wisconsin: "55",
  Wyoming: "56"
};

export const setSummary = () => dispatch => {
  axios
    .get("https://api.covid19api.com/country/us/status/confirmed")
    .then(res => {
      // dispatch({type: SET_SUMMARY, payload: res.data})
      let obj = {};
      console.log(res.data);
      res.data.forEach(item => {
        let name = item.Province;

        if (!name.includes("County") && name.split(", ").length <= 1) {
          if (!obj[name]) {
            obj = {
              ...obj,
              [name]: item
            };
          } else {
            obj[name] = {
              ...item,
              Cases: obj[name].Cases + item.Cases
            };
          }
        }
      });
      for (const props in STATE_TO_FIPS) {
        obj = {
            ...obj,
            [props]: {
                ...obj[props],
                id: STATE_TO_FIPS[props]
            }
          
        };
      }
      dispatch({
        type: SET_SUMMARY,
        payload: obj
      });
    })
    .catch(err => {
      console.error(err.message);
    });
};
