import {
	Select,
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	
} from '@mantine/core';
import { useState, useRef, useEffect } from 'react';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);
	//const [value, setValue] = useState('');

	const taskTitle = useRef('');
	const taskDeadline = useRef('');
	const taskStatus = useRef('');
	
	function createTask() {
		setTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				deadline: taskDeadline.current.value,
				status: taskStatus.current.value,
			},
		]);

		saveTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				deadline: taskDeadline.current.value,
				status: taskStatus.current.value,
			},
		]);
	}

	function deleteTask(index) {
		var clonedTasks = [...tasks];

		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);

		saveTasks([...clonedTasks]);
	}

	function loadTasks() {
		let loadedTasks = localStorage.getItem('tasks');

		let tasks = JSON.parse(loadedTasks);
		

		if (tasks) {
			setTasks(tasks);
		}
	}
	
	function saveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	useEffect(() => {
		loadTasks();
	}, []);

	return (	
				<div className='App'>
					<Modal
						opened={opened}
						size={'md'}
						title={'Add a new todo'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
						}}
						centered>
						<TextInput
							mt={'md'}
							ref={taskTitle}
							placeholder={'Title'}
							label={'Title'}
							required
						/>
						<TextInput
							ref={taskDeadline}
							mt={'md'}
							placeholder={'Deadline'}
							label={'Deadline'}
						/>
						<Select
							label="Status"
							ref={taskStatus}
							mt={'md'}
							//value={value}
							//onChange={setValue}
							placeholder="Select one"
							data={[
								{ value: '100', label: 'Done' },
								{ value: '0', label: 'Not started' },
								{ value: '50', label: 'In progress' },

							]}
						/>
						<Group mt={'md'} position={'apart'}>
							<Button
								onClick={() => {
									setOpened(false);
								}}
								variant={'subtle'}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									createTask();
									setOpened(false);
								}}>
								Create Task
							</Button>
						</Group>
					</Modal>
					<Container size={550} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 400,
								})}>
								My Tasks
							</Title>
							
						</Group>
						{tasks.length > 0 ? (
							tasks.map((task, index) => {
								if (task.title) {
									return (
										<Card withBorder key={index} mt={'sm'}>
											<Group position={'apart'}>
												<Text size={'lg'} weight={'bold'}>{task.title}</Text>
																					
												<Button
													onClick={() => {
														deleteTask(index);
													}}
												>
													Delete
													
												</Button>
											</Group>
											<Group spacing="xs">
												<i><Text size={'lg'} mt={'sm'}>Deadline:</Text></i>
												<i><Text size={'lg'}  mt={'sm'}>
													{task.deadline}</Text></i>
											</Group>
											<Group spacing="xs">
												<i><Text size={'lg'} mt={'sm'}>Status:</Text></i>
												<i><Text size={'lg'} mt={'sm'}>{task.status}</Text></i>
											</Group>
										</Card>
										
									);
								}
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no tasks
							</Text>
						)}
						<Button
							onClick={() => {
								setOpened(true);
							}}
							mt={'md'}>
							Add a new todo
						</Button>
					</Container>
				</div>
			
	);
}
