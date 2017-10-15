import React from 'react';

// Styles
import style from './PostCommentList.css';

export function PostCommentList(props) {
  return (
    <div>
      <div className={style['prev-comments-box']}>
        {/* stub */}
        <div className={style['single-comment']}>
          <p><b>Steve</b> says :</p>
          <div className={style['single-comment-text']}>
            Drawings me opinions returned absolute in.
            Otherwise therefore sex did are unfeeling something.
            Certain be ye amiable by exposed so. To celebrated estimating excellence do.
            Coming either suffer living her gay theirs.
            Furnished do otherwise daughters contented conveying attempted no.
            Was yet general visitor present hundred too brother fat arrival.
            Friend are day own either lively new.
          </div>
        </div>
        <div className={style['single-comment']}>
          <p><b>Vincent</b> says :</p>
          <div className={style['single-comment-text']}>
            Moments its musical age explain.
            But extremity sex now education concluded earnestly her continual.
            Oh furniture acuteness suspected continual ye something frankness.
            Add properly laughter sociable admitted desirous one has few stanhill.
            Opinion regular in perhaps another enjoyed no engaged he at.
            It conveying he continual ye suspected as necessary.
            Separate met packages shy for kindness.
          </div>
        </div>
      </div>
    </div>
  );
}
