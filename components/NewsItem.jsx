/*
Mit Hilfe des useToggle-Hooks, den wir in der
Custom Hooks-Übung geschrieben haben, soll der Content-Bereich
ein- und ausgeblendet werden, der Text im Button soll entsprechend
wechseln. Anfangs soll der Content eingeklappt sein.
Der description-Text ist für "description", nicht "content" des
News-Objekts. Das Bild nur anzeigen, wenn eine Bildquelle vorhanden
ist. Das alt-Attribut kann leer bleiben, weil es im Datensatz leider
nicht enthalten ist.
 */
import { useToggle } from '@/hooks/useToggle';

export default function Newsitem({ title, url, description, urlToImage ,index}) {
  const [visable, toggleVisable] = useToggle(false);
  return (
    <article className='news-item slide-in-elliptic-left-fwd' style={{"--delay":`${index *0.2}s`}}>
      <h3 className='news-item__title'>{title && <a href={url}>{title}</a>}</h3>
      <button onClick={toggleVisable}>
        {visable ? 'Weniger anzeigen' : 'Mehr anzeigen'}
      </button>

      {visable && (
        <div className='news-item__content'>
          {urlToImage && (
            <img className='news-item__image' src={urlToImage} alt='news' />
          )}
          <p className='news-item__description'>{description}</p>
        </div>
      )}
    </article>
  );
}
