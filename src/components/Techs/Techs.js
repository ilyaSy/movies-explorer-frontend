import MainHeader from '../MainHeader/MainHeader';
import './Techs.css';

export default function Techs() {
  return (
    <section id='techs' className='techs'>
      <MainHeader title='Технологии' />

      <h2 className='techs__title'>7 технологий</h2>
      <p className='techs__subtitle'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      {/* <ul className='techs__list'>
        <li className='techs__list-item'>HTML</li>
        <li className='techs__list-item'>CSS</li>
        <li className='techs__list-item'>JS</li>
        <li className='techs__list-item'>React</li>
        <li className='techs__list-item'>Git</li>
        <li className='techs__list-item'>Express.js</li>
        <li className='techs__list-item'>mongoDB</li>
      </ul> */}

      <div className='techs__list'>
        <p className='techs__list-item'>HTML</p>
        <p className='techs__list-item'>CSS</p>
        <p className='techs__list-item'>JS</p>
        <p className='techs__list-item'>React</p>
        <p className='techs__list-item'>Git</p>
        <p className='techs__list-item'>Express.js</p>
        <p className='techs__list-item'>mongoDB</p>
      </div>
    </section>
  );
}
