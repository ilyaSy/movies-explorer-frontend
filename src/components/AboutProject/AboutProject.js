import MainHeader from '../MainHeader/MainHeader';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section id='project' className='project'>
      <MainHeader title='О проекте' />

      <div className='project__details'>
        <h3 className='project__details-title project__details-title_t1'>
          Дипломный проект включал 5 этапов
        </h3>
        <h3 className='project__details-title project__details-title_t2'>
          На выполнение диплома ушло 5 недель
        </h3>
        <p className='project__details-text project__details-text_t1'>
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className='project__details-text project__details-text_t2'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>

      <div className='project__progress'>
        <p className='project__progress-week-back'>1 неделя</p>
        <p className='project__progress-week-front'>4 недели</p>
        <p className='project__progress-title-back'>Back-end</p>
        <p className='project__progress-title-front'>Front-end</p>
      </div>
    </section>
  );
}
