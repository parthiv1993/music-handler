import React from "react";
import SanitizedHTML from "../SanitizedHtml/SanitizedHtml";
import './MusicCard.css';

const imageSrc = 'https://w7.pngwing.com/pngs/556/824/png-transparent-music-symbol-icon-music-notes-miscellaneous-angle-text.png';

const MusicCard = (props)=>{

 

    // console.log(props);
    return <article className="music-card">
        <aside className="image-container">
            <img src={imageSrc} alt={props.title} width='100%'/>
        </aside>
        <section className="details-container">
            <section className="card-title">
                <SanitizedHTML value={props.titleWithTags}/>    
            </section>
            <section className="suplimentary-info">
                {props.supplementInformation}
            </section>
            <section className="descrption">
                <SanitizedHTML value={props.descriptionWithTags}/>
            </section>
            <section className="play-music">
                <a href="#">
                    <span className="play-arrow"></span>
                    <span>Play Vocal</span>
                </a>
            </section>
        </section>
    </article>
}

export default MusicCard;