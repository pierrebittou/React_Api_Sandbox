import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useState, useEffect } from "react";
import "./Home.css";
import useAuth from "../Context/useAuth.js";
import TrackSearchResult from "../TrackSearchResult.js";
import Player from "../Player.js";
import Dropdown from "react-dropdown";

import { Button, Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import { HiSwitchHorizontal } from "react-icons/hi";
import axios from "axios";
import React from "react";

let test = 0;

const code = new URLSearchParams(window.location.search).get("code");
const spotifyApi = new SpotifyWebApi({
  clientId: "6d4168952f4841ab9cccc39d98b9262a",
});

function WidgetOne() {
  const apiKey = "30c59ac34c45eaef42807d42ceed91c6";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div>
      <div className="footer text-center">
        <Form.Control
          className="input"
          type="search"
          name="City_1"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={getWeather}
        />
        <div className="mt-3 text-center">
          {typeof weatherData.main == "undefined" ? (
            <div>
              <p></p>
            </div>
          ) : (
            <div>
              <p>City : {weatherData.name}</p>
              <p>
                Temperature :{" "}
                {Math.round((weatherData.main.temp - 32) * (5 / 9))}
                °C
              </p>
              <p>Weather : {weatherData.weather[0].main}</p>
            </div>
          )}
          {weatherData.cod == "404" ? <p>City not found</p> : <></>}
        </div>
      </div>
    </div>
  );
}

function WidgetTwo() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  // Calling the api whenever the dependency changes
  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then((res) => {
        setInfo(res.data[from]);
      });
  }, [from]);

  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  // Function to convert the currency
  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <h5>Amount</h5>
          <Form.Control
            className="input"
            type="search"
            name="City_1"
            placeholder="Enter the amount"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="middle">
          <h5>From</h5>
          <Dropdown
            options={options}
            onChange={(e) => {
              setFrom(e.value);
            }}
            value={from}
            placeholder="From"
          />
        </div>
        <div className="switch">
          <HiSwitchHorizontal
            size="30px"
            onClick={() => {
              flip();
            }}
          />
        </div>
        <div className="right">
          <h3>To</h3>
          <Dropdown
            options={options}
            onChange={(e) => {
              setTo(e.value);
            }}
            value={to}
            placeholder="To"
          />
        </div>
      </div>
      <div className="result">
        <button
          onClick={() => {
            convert();
          }}
        >
          Convert
        </button>
        <h2>Converted Amount:</h2>
        <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
      </div>
    </div>
  );
}

function WidgetThree() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const accessToken = useAuth(code);

  useEffect(() => {
    if (!code) return;
    if (test === 0) {
      alert("Logged in Spotify");
      test = 1;
    }
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div>
      <div className="footer">
        <Container
          className="d-flex flex-column py-2"
          style={{ height: "100vh" }}
        >
          <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            {searchResults.map((track) => (
              <TrackSearchResult track={track} key={track.uri} />
            ))}
          </div>
          <Player accessToken={accessToken} />
        </Container>
        {/* {code} */}
      </div>
    </div>
  );
}

const initialPositions = [
  {
    col: 1,
    colSpan: 2,
    rowSpan: 1,
  },
  {
    col: 1,
    colSpan: 4,
    rowSpan: 18,
  },
  {
    col: 5,
    colSpan: 2,
    rowSpan: 1,
  },
];

async function getDataAxios(City) {
  console.log(City);
  await axios
    .get("http://localhost:8080/api/weather/:" + City)
    .then((response) => {
      console.log(response);
      return response;
    });
}

function HomePage() {
  const WeatherCity = ["Paris", "Rome"];
  const [DataCity, setDataCity] = useState([]);

  // useEffect(async () => {
  //   let tmp = [];
  //   for (let i = 0; i < WeatherCity.length; i++) {
  //     let response = await getDataAxios(WeatherCity[i]);
  //     tmp.push(response);
  //     console.log(response);
  //   }
  //   setDataCity(tmp);
  // }, []);

  // useEffect(() => {
  //   console.log(DataCity);
  // }, [DataCity]);

  const [post, setPost] = React.useState(null);
  const [positions, setPositions] = useState(initialPositions);

  const widgets = [
    {
      header: "Weather",
      body: <WidgetOne />,
    },
    {
      header: "Currency",
      body: <WidgetTwo />,
    },
    {
      header: "Spotify",
      body: <WidgetThree />,
    },
  ];

  const handleReposition = (e) => {
    setPositions(e.value);
  };

  return (
    <>
      <div className="App">
        <TileLayout
          className="tileLayout text-center"
          columns={8}
          rowHeight={255}
          gap={{ rows: 10, columns: 10 }}
          positions={positions}
          items={widgets}
          onReposition={handleReposition}
        />
      </div>
    </>
  );
}

export default HomePage;

// function exchange() {
//     this.state = {
//       result: null,
//       fromCurrency: "USD",
//       toCurrency: "GBP",
//       amount: 1,
//       currencies: []
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("http://api.openrates.io/latest")
//       .then(response => {
//         const currencyAr = ["EUR"];
//         for (const key in response.data.rates) {
//           currencyAr.push(key);
//         }
//         this.setState({ currencies: currencyAr });
//       })
//       .catch(err => {
//         console.log("oppps", err);
//       });
//   }
//   convertHandler = () => {
//     if (this.state.fromCurrency !== this.state.toCurrency) {
//       axios
//         .get(
//           `http://api.openrates.io/latest?base=${
//             this.state.fromCurrency
//           }&symbols=${this.state.toCurrency}`
//         )
//         .then(response => {
//           const result =
//             this.state.amount * response.data.rates[this.state.toCurrency];
//           this.setState({ result: result.toFixed(5) });
//         })
//         .catch(error => {
//           console.log("Opps", error.message);
//         });
//     } else {
//       this.setState({ result: "You cant convert the same currency!" });
//     }
//   };
//   selectHandler = event => {
//     if (event.target.name === "from") {
//       this.setState({ fromCurrency: event.target.value });
//     } else {
//       if (event.target.name === "to") {
//         this.setState({ toCurrency: event.target.value });
//       }
//     }
//   };
//   render() {
//     return (
//       <div className="Converter">
//         <h2>
//           <span>Currency</span>Converter
//           <span role="img" aria-label="money">
//             &#x1f4b5;
//           </span>
//         </h2>
//         <div className="From">
//           <input
//             name="amount"
//             type="text"
//             value={this.state.amount}
//             onChange={event => this.setState({ amount: event.target.value })}
//           />
//           <select
//             name="from"
//             onChange={event => this.selectHandler(event)}
//             value={this.state.fromCurrency}
//           >
//             {this.state.currencies.map(cur => (
//               <option key={cur}>{cur}</option>
//             ))}
//           </select>
//           <select
//             name="to"
//             onChange={event => this.selectHandler(event)}
//             value={this.state.toCurrency}
//           >
//             {this.state.currencies.map(cur => (
//               <option key={cur}>{cur}</option>
//             ))}
//           </select>
//           <button onClick={this.convertHandler}>Convert</button>
//           {this.state.result && <h3>{this.state.result}</h3>}
//         </div>
//       </div>
//     );
//   }
