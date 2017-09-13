import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';

export default class In_theaters extends Component {
    constructor(props){
        super(props);
        this.state = {
            subjects:[]
        }
    }
    componentDidMount() {
        // 1 --> 0-4
        // 2 --> 5-9
        // 3 --> 10-14
        // n --> (n-1)*5 - (n-1)*5+4    
        let start = (parseInt(this.props.params.page) - 1) * 5;    
        console.log(start);
        fetchJsonp(`https://api.douban.com/v2/movie/in_theaters?start=${start}&count=5`)
        .then((response)=>{
          return response.json();
        }).then((json)=>{
            this.setState({
                subjects:json.subjects
            })
        }).catch(function(ex) {
          console.log('parsing failed', ex)
        })
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
                    <label>总共：0条记录,第0/0页;</label>
                    <button className="prev disable ">上一页</button>
                    <button className="next">下一页</button>
                </div>
            </div>
        )
    }
}