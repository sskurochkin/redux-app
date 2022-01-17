import React, { Component } from "react";
import {connect} from 'react-redux'
import {createPost} from '../redux/actions'

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
		};
	}

	submitHandler = (e) => {
		e.preventDefault();

        const {title} = this.state

		if(!title.trim()){
			return
		}

        const newPost = {
            title, id: Date.now().toString()
        }
        this.props.createPost(newPost)
        this.setState({title : ''})
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

const mapDispatchToProps = {
    createPost
}

export default connect(null, mapDispatchToProps)(PostForm);
