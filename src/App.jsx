import React, { Component } from 'react';
import './reset.css';
import './wap.css';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <div className="top">
          <div className="header">
            <Link to="/home_page"><img src="/img/logo.png"  alt="awfew" /></Link>
            <div className="search">
              <input className="my-input" type="text" placeholder="电影搜索" />
              <button>搜索</button>
            </div>
          </div>
          <nav className="nav">
            <ul>
              <li className="active"><Link to="/home">首页</Link></li>
              <li><Link to="/movie/in_theaters">正在热映</Link></li>
              <li><Link to="/movie/coming_soon">即将上映</Link></li>
              <li><Link to="/movie/top250">Top250</Link></li>
            </ul>
          </nav>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
