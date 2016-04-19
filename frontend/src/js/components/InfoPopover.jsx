const React = require('react');
const { Popover, OverlayTrigger, Button } = require('react-bootstrap');

const InfoPopover = (container, statename, stateURL, heatMapURL) => {
  const popover =
    <Popover id="info-popover" positionTop={100} title="More Info">
      <a href={stateURL}>{`${statename} Real Estate`}</a>
      <br />
      <a href={heatMapURL}>Real Estate Heat Map</a>
    </Popover>;

  return (
    <OverlayTrigger
      container={container}
      trigger="click"
      placement="bottom"
      overlay={popover}>
      <Button className="info-btn" bsStyle="default" bsSize="xsmall">
        <i className="fa fa-info"></i>
      </Button>
    </OverlayTrigger>
  );
};

module.exports = InfoPopover;

