import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import {browserHistory} from 'react-router';

export default class MovieList extends Component {
    constructor(props){
        super(props);
        this.state = {
            subjects:[],
            total:0,
            count:0
        }
    }
    componentDidMount() {
        // 1 --> 0-4
        // 2 --> 5-9
        // 3 --> 10-14
        // n --> (n-1)*5 - (n-1)*5+4    
        this.fetchData();
    }
    fetchData=()=>{
        let start = (parseInt(this.props.params.page) - 1) * 5;    
        fetchJsonp(`http://localhost/mylist.php?start=${start}&count=5`)
        .then((response)=>{
          return response.json();
        }).then((json)=>{
            this.setState({
                subjects:json.subjects,
                total:json.total,
                count:json.count,
                maxPage:Math.ceil(json.total / json.count)
            })
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
    }
    componentDidUpdate() {
        this.fetchData();
    }
    goPage = (newPage)=>{
        if(newPage === 0)newPage = 1;
        if(newPage > this.state.maxPage)newPage = this.state.maxPage;
        console.log(this.props.params)
        browserHistory.push(`/movie/${this.props.params.movieType}/${newPage}`)
    }
    render() {
        return (
            <div className="list">
                <ul>
                    {
                        this.state.subjects.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href="/details">
                                        <img src={item.images.large} alt="awfew" />
                                    </a>
                                    <div className="meta">
                                        <h4><span>{item.title}</span> <em>{item.rating.average}分</em></h4>
                                        <div className="otherinfo">类型:<span>{item.genres.join(' ')}</span></div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="paging">
                    <label>总共：{this.state.total}条记录,第{this.props.params.page}/{this.state.maxPage}页;</label>
                    <button className={"prev" + ' ' +(this.props.params.page-0===1?'disable':'')} onClick={this.goPage.bind(this,this.props.params.page-1)}>上一页</button>
                    <button className={"next" + ' ' + (this.props.params.page-0=== this.state.maxPage?'disable':'')} onClick={this.goPage.bind(this,this.props.params.page-0+1)}>下一页</button>
                </div>
            </div>
        )
    }
}