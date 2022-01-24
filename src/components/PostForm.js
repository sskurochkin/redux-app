import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import Alert from "./Alert";

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
		};
	}

	submitHandler = (e) => {
		e.preventDefault();

		const { title } = this.state;

		if (!title.trim()) {
			return this.props.showAlert("Name is empty");
		}

		const newPost = {
			title,
			id: Date.now().toString(),
		};
		this.props.createPost(newPost);
		this.setState({ title: "" });
	};
	changeInputHandler = (e) => {
		this.setState((prev) => ({
			...prev,
			...{ [e.target.name]: e.target.value },
		}));
	};

	render() {
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					
				{this.props.alert && <Alert text={this.props.alert} />}

					<div className='form-group'>
						<label htmlFor='title' className='form-label'>
							Заголовок поста
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							value={this.state.title}
							name='title'
							onChange={this.changeInputHandler}
						/>
					</div>
					<button type='submit' className='btn btn-success mt-2'>
						Создать
					</button>
				</form>
				<h1>Post form</h1>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	alert: state.app.alert
})

const mapDispatchToProps = {
	createPost,
	showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
