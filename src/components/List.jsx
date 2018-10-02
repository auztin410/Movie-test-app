import React from "react";
import axios from 'axios';
import '../App.css';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      list: '',
      wantToSee: '',
      showList: false,
    };

    this.handleShowList = this.handleShowList.bind(this);
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

handleShowList(event) {
    this.setState({
        showList: true,
    });
}



  render() {

    const data = this.state.list

    console.log("state list");
    console.log(this.state.list)
    

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
            },
            {
                Header: "Directed by",
                accessor: "directed"
            },
            {
                Header: "Genres",
                accessor: "genre"
            }
          ]
        
      }]

      if(this.state.showList === false) {
          return (
            <div>
                <br/>
                <br/>
            <button onClick={this.handleShowList}>Show List</button>
        </div>
          );
          
      }

      else if(this.state.showList === true) {
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

      else {
          return(
              <div>
                  You dun broke it.
              </div>
          )
      }
    
  }
}

export default List;