import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';


class Item extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id: props.id,
			name: props.name,
			img: props.img,
			description: props.description,
			category: props.category,
			watering_interval: props.watering_interval,
			preference: props.preference,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	
	handleSubmit(event){
		
	}
	deleteItem(){
		localStorage.removeItem(this.state.id);
	}
	saveItem(){
		localStorage.setItem(this.state.id, JSON.stringify(this.state));
	}
	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
	
	render(){
		return (
			<table>
			<tbody>
				<tr>
					<td>
						<img src={this.props.img}/>
					</td>
					<td>
						<form onSubmit={this.handleSubmit} className="Item">
							Nazwa: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/><br/>
							Url: <input type="url" name="img" value={this.state.img} onChange={this.handleInputChange}/><br/>
							Opis: <input type="text" name="description" value={this.state.description} onChange={this.handleInputChange}/><br/>
							Kategoria: <input type="text" name="category" value={this.state.category} onChange={this.handleInputChange}/><br/>
							Co jaki czas nawadniać: <input type="number" name="watering_interval" value={this.state.watering_interval} onChange={this.handleInputChange}/><br/>
							Preferencje: <input type="text" value={this.state.preference} name="preference" onChange={this.handleInputChange}/><br/>
							<input type="submit" value="Zapisz" onClick={() => this.saveItem()}/>
							<input type="submit" value="Usuń" onClick={() => this.deleteItem()}/>
						</form>
					</td>
				</tr>	
			</tbody>
			</table>
		);
	}
}


class ItemForm extends React.Component {
	constructor(props){
		super(props);
		let max_val = -1;
		Object.keys(localStorage).forEach(function(key){
			var value = JSON.parse(localStorage.getItem(key));
			if (max_val <= value.id)
				max_val = value.id + 1
		});
		this.state = {
			id: max_val,
			name: "",
			img: "",
			description: "",
			category: "",
			watering_interval: "",
			preference: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleSubmit(event){
		localStorage.setItem(this.state.id, JSON.stringify(this.state));
	}
	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
		  [name]: value
		});
	}
	
	
	render(){
		return (
			<form className="ItemForm" onSubmit={this.handleSubmit}>
				<input type="text" name="name" placeholder="Nazwa" value={this.state.name} onChange={this.handleInputChange}/><br/>
				<input type="text" name="img" placeholder="Link" value={this.state.img} onChange={this.handleInputChange}/><br/>
				<input type="longtext" name="description" placeholder="Opis" value={this.state.description} onChange={this.handleInputChange}/><br/>
				<input type="text" name="category" placeholder="Kategoria" value={this.state.category} onChange={this.handleInputChange}/><br/>
				<input type="number" name="watering_interval" placeholder="Częstotliwość nawadniania" value={this.state.watering_interval} onChange={this.handleInputChange}/><br/>
				<input type="text" name="preference" placeholder="Preferencje" value={this.state.preference} onChange={this.handleInputChange}/><br/>
				<input type="submit" value="Dodaj"/>
			</form>
		);
	}
}

class ItemList extends React.Component {
	render(){
		var rows = [];
		Object.keys(localStorage).forEach(function(key){
			var value = JSON.parse(localStorage.getItem(key));
			rows.push(value);
		});
		return (
			<div>
			{
				React.Children.toArray(
					rows.map((value, index) => <div><Item 
						id={value.id}
						name={value.name}
						img={value.img}
						description={value.description}
						category={value.category}
						watering_interval={value.watering_interval}
						preference={value.preference}/>
					<br/></div>)
				)
			}
			</div>
		);
	}
}

function App() {
  return (
	<div>
		<ItemForm/>
		<br/>
		<ItemList/>
	</div>
  );
}

export default App;
