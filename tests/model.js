import {model, field} from '../';

describe('Basics', () => {
  it('should define model with fields', () => {
    @model()
    @field({name: 'name'})
    class Model {
    }
  });
});
