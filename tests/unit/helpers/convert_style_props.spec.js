import convertStyleProps from '@/helpers/convert_style_props';

const TEST_STYLE_OBJ = {
  width: 100,
  height: 200,
  top: 10,
  left: 20,
};

describe('helpers: convert_style_props.js', () => {
  it('convert into em', () => {
    const EXPECTED_OBJ = {
      width: '100em',
      height: '200em',
      top: '10em',
      left: '20em',
    };

    expect(convertStyleProps(TEST_STYLE_OBJ, 'em')).toEqual(EXPECTED_OBJ);
  });

  it('convert into px by default', () => {
    const EXPECTED_OBJ = {
      width: '100px',
      height: '200px',
      top: '10px',
      left: '20px',
    };

    expect(convertStyleProps(TEST_STYLE_OBJ)).toEqual(EXPECTED_OBJ);
  });
});
