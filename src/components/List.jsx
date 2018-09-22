import React from "react";
import axios from 'axios';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      list: '',
      wantToSee: '',
    };
  }

  componentDidMount() {
    if(!this.props.user) {
        console.log("No User");
    }
    else{
        axios.get(`/userlist/${this.props.user._id}`).then((res) => {
            console.log("list of movie id's from user list");
            console.log(res.data);
            this.setState({
                list: res.data[0].list,
                wantToSee: res.data[0].wantToSee,
            });
        }).catch((err) => (console.log(err)));
    }
};


  render() {
    const data  = [{
        title: "Test Movie",
        runtime: "140 mins",
        rated: "PG-13"
    }];

    const columns=[{
        
          Header: "Movie List",
          columns: [
            {
              Header: "Title",
              accessor: "title"
            },
            {
              Header: "Run Time",
              accessor: "runtime"
            },
            {
                Header: "Rating",
                accessor: "rated"
            }
          ]
        
      }]
    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
        />
        <br />
    
      </div>
    );
  }
}

export default List;