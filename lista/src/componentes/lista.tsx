import './lista.css';
import { useState } from 'react';

interface MeuTreino {
    exercicio: string;
    series: string;
    reps: string;
}	

const Formulario = () => {
    const [data, setExercicio] = useState<MeuTreino>({
        exercicio: '',
        series: '',
        reps: 'A fazer'
    });
    const [exercicios, setExercicios] = useState<MeuTreino[]>([]);

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExercicio({
            ...data,
            [name]: value
        });
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data.exercicio && data.series && data.reps) {
            setExercicios([...exercicios, data]);
            setExercicio({ exercicio: '', series: '', reps: 'A fazer' }); 
        }
    };

    const changeStatus = (index: number, newReps: string) => {
        const newExercicios = [...exercicios];
        newExercicios[index].reps = newReps;
        setExercicios(newExercicios);
    };

    const deleteTask = (index: number) => {
        const newExercicios = exercicios.filter((_, i) => i !== index);
        setExercicios(newExercicios);
    };

    return (
        <form onSubmit={submitForm} className="form-container">
            <h2>Lista de Exercícios</h2>
            <div className="form-group">
                <label htmlFor='exercicio'>Exercício</label>
                <input 
                    type='text' 
                    id='exercicio' 
                    name='exercicio' 
                    value={data.exercicio} 
                    onChange={inputChange} 
                />
            </div>
            <div className="form-group">
                <label htmlFor='series'>Séries</label>
                <input 
                    type='text' 
                    id='series' 
                    name='series' 
                    value={data.series} 
                    onChange={inputChange} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="reps">Repetições</label>
                <select 
                    id="reps" 
                    name="reps" 
                    value={data.reps} 
                    onChange={inputChange}
                >
                    <option value="6-8">6-8</option>
                    <option value="8-12">8-12</option>
                    <option value="12-15">12-15</option>
                </select>
            </div>
            <button type='submit'>Adicionar</button>

            {exercicios.length > 0 && (
                <div>
                    {exercicios.map((t, index) => (
                        <div key={index} className='card'>
                            <h3>{t.exercicio}</h3>
                            <h4>Séries: {t.series}</h4>
                            <h4>Repetições: {t.reps}</h4>
                            <select 
                                name="reps" 
                                id="reps" 
                                value={t.reps} 
                                onChange={(e) => changeStatus(index, e.target.value)}
                            >
                                <option value="6-8">6-8</option>
                                <option value="8-12">8-12</option>
                                <option value="12-15">12-15</option>
                            </select>
                            <button className='fim' onClick={() => deleteTask(index)}>Finalizar</button>
                        </div>
                    ))}
                </div>
            )}
        </form>
    );
};

export default Formulario;
