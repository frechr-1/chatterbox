import {ReactComponent as XLogo} from "./x.svg";
import {ReactComponent as GoogleLogo} from "./glogo.svg";
import {ReactComponent as InstagramLogo} from "./iglogo.svg";
import {ReactComponent as FacebookLogo} from "./fblogo.svg";

import './App.css'; 
function App() {
  return (
    <div className="App ">
      <div className="Header-nav-main-group  ">
        <div className="Header-nav-group  ">
          <header className="App-header">ChatterBox</header>
          <nav className="App-nav">
            <ul className="no-bullets horizontal">
              <li>Home</li>
              <li>Feeds</li>
              <li>Groups</li>
            </ul>
          </nav>
        </div>
        <main className="App-main  ">
          <p>Welcome to ChatterBox!</p>
        </main>
      </div>
      <footer className="App-footer  ">
        <ul className="no-bullets horizontal">
          <li>
            <h4>Contact us</h4>
            <ul className="no-bullets">
              <li>
                <p>Address: Silicon Valley, Boxerstreet 23</p>
              </li>
              <li>
                <p>Email: chatterbox@tada.cop</p>
              </li>
              <li>
                <p>Tlf.nr: 99999999</p>
              </li>
            </ul>
          </li>
          <li>
            <h4>Social media</h4>
            <ul className="no-bullets horizontal shrink">
              <li>
                <a href="https://x.com/">
                  <XLogo />
                </a>
              </li>
              <li>
                <a href="https://google.com/">
                  <GoogleLogo />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/">
                  <InstagramLogo />
                </a>
              </li>
              <li>
                <a href="https://facebook.com/">
                  <FacebookLogo />
                </a>
              </li>
            </ul>
          </li>
          <li>
            <h4>Subscription</h4>
            <ul className="no-bullets">
              <li>Tier 1</li>
              <li>Tier 2</li>
              <li>Tier 3</li>
            </ul>
          </li>

          <li>
            <h4>About us</h4>
            <ul className="no-bullets">
              <li>History</li>
              <li>News</li>
              <li>Publications</li>
            </ul>
          </li>
          <li>
            <h4>Help</h4>
            <ul className="no-bullets">
              <li>Account</li>
              <li>Usage</li>
              <li>Developers</li>
              <li>Jobs</li>
            </ul>
          </li>

          <li>
            <h4>Legal</h4>
            <ul className="no-bullets">
              <li>Privacy Policy</li>
              <li>Cookie settings</li>
            </ul>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
