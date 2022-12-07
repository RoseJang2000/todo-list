import './TodoTitle.css';
import './TodoTitle.scss'

const TodoTitle = ({len}) => {
    return (
        <div className='title_container'>
            <p className='title_text'>Tasks to Do ({len})</p>
        </div>
    );
}

export default TodoTitle
