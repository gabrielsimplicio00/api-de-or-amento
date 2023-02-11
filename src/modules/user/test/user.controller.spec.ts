
import { MainDto } from 'src/main.dto';
import { ReadUserDto } from '../dto/read-user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController test suite', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);
  });

  describe('get /users', () => {
    it('should return an array of users', async () => {
      const result: ReadUserDto[] = [{
        id: 1,
        name: "string",
        tax: 100
      },
      {
        id: 2,
        name: "string",
        tax: 50
      }];
      jest.spyOn(userService, 'getUsers').mockImplementation(async () => result);

      expect(await userController.getUsers()).toBe(result);
    });
  });

  describe('get /user/:id?products=[1,2,3]', () => {
    it('should return user and userProduct objects with total budget', async () => {
      const result: MainDto = {
        user: {
          id: 15,
          name: "string",
          tax: 114
        },
        userProducts: {
          orcamentoTotal: 16376.1,
          products: [
            {
              id: 1,
              name: "string",
              price: 6945,
              valorCorrigido: 7917.3
            },
            {
              id: 2,
              name: "string",
              price: 2435,
              valorCorrigido: 2775.9
            },
            {
              id: 3,
              name: "string",
              price: 4985,
              valorCorrigido: 5682.9
            }
          ]
        }
      };

      jest.spyOn(userService, 'getUser').mockImplementation(async () => result)


      expect(await userController.getUser(15, "[1,2,3]")).toBe(result)
    })
  })
  describe('get /user/:id', () => {
    it('should return user object and userProducts should not have values, total budget should be 0', async () => {
      const result: MainDto = {
        user: {
          id: 15,
          name: "string",
          tax: 114
        },
        userProducts: {
          orcamentoTotal: 0,
          products: []
        }
      };
      jest.spyOn(userService, 'getUser').mockImplementation(async () => result)


      expect(await userController.getUser(15)).toBe(result)
    })
  })
});
