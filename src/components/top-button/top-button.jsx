import styled from "styled-components";

const StyledBtn = styled('button')`
  position: fixed;
  top: 90%;
  right: 10%;
  width: 200px;
`;

function TopButton() {
  const handleClick = (evt) => {
    evt.preventDefault();
    
    const timer = setInterval(() => {
      document.documentElement.scrollTo({top: document.documentElement.scrollTop - 50});
      if (document.documentElement.scrollTop === 0) {
        clearInterval(timer);
      }
    });
  }
  return (
    <StyledBtn
      className="btn waves-effect waves-light"
      type="submit"
      name="action"
      onClick={handleClick}
    >
      Наверх
      <i className="material-icons right">arrow_upward</i>
    </StyledBtn>
  );
}

export  default TopButton;
