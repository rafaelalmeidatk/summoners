export default ({ championId }) => (
  <div
    className="most-played-champion-wrapper"
    style={{
      backgroundImage: `url('http://www.stelar7.no/cdragon/latest/uncentered-splash-art/${championId}/0.png')`,
    }}
  >
    <div className="inner" />
    <div className="mastery-icon" />

    <style jsx>{`
      .most-played-champion-wrapper {
        position: relative;
        width: 30%;
        height: 200px;
        border-radius: 7px;
        background: rgba(0, 0, 0, 0.6);
        background-size: cover;
        background-position: center center;
      }

      .inner {
        position: absolute;
        background: linear-gradient(0deg, rgba(5, 24, 32, 0.8), rgba(5, 24, 32, 0));
        width: 100%;
        height: 100%;
      }
    `}</style>
  </div>
)
