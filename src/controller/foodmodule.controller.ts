import { NextFunction, query, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import { PrismaClient, UserDishes } from '@prisma/client';
import catchAsync from '../utils/catchAsync';
import moment from 'moment-timezone';
import { array } from 'zod';

const prisma = new PrismaClient();

const addDishes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cityid, date, breakfast, lunch, dinner } = req.body;

    try {
      let createdDate = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

      // const fooodmenubydate = await prisma.foodmenu.findMany({
      //   where: {
      //     cityid: cityid,
      //   },
      //   include: {
      //     menu: {
      //       where: {
      //         date: new Date(createdDate),
      //       },
      //     },
      //   },
      // });
      //  console.log(fooodmenubydate);

      // console.log(fooodmenubydate.length !== 0);

      // if (fooodmenubydate.length != 0) {
      //   let ID = fooodmenubydate[0].menu[0].id;
      //   const menuu = await prisma.menu.update({
      //     where: {
      //       id: ID,
      //     },
      //     data: {
      //       date: new Date(createdDate),
      //       breakfast: [...breakfast],
      //       lunch: [...lunch],
      //       dinner: [...dinner],
      //     },
      //   });

      //   return res.status(201).json({
      //     status: true,
      //     data: menuu,
      //   });

      const Menu = await prisma.foodmenu.findMany({
        where: {
          cityid: cityid,
        },
        select: {
          menu: { where: { date: createdDate } },
        },
        // include: {
        //   menu:true
        // }
      });
      const results = Menu.filter((r) => r.menu.length !== 0);

      if (results[0]?.menu?.length > 0) {
        return res.status(201).json({
          status: false,
          message:
            'Already Meal order available for same date please update it for changes',
        });
      }

      const newDishes = await prisma.foodmenu.create({
        data: {
          cityid: cityid,
        },
      });

      const menuu = await prisma.menu.create({
        data: {
          date: createdDate,
          breakfast: [...breakfast],
          lunch: [...lunch],
          dinner: [...dinner],
          foodmenuid: newDishes.id,
        },
      });

      return res.status(200).json({
        status: true,
        message: 'Meals Added sucessfully',
        data: menuu,
      });
    } catch (error) {
      return console.log(error);
    }
  }
);

const updateDishes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cityid, date, breakfast, lunch, dinner } = req.body;
    let createdDate = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // const fooodmenubydate = await prisma.foodmenu.findMany({
    //   where: {
    //     cityid: cityid,
    //   },
    //   select: {
    //     menu: { where: { date: createdDate } },
    //   },
    // });
    const Menu = await prisma.foodmenu.findMany({
      where: {
        cityid: cityid,
      },
      select: {
        menu: { where: { date: createdDate } },
      },
      // include: {
      //   menu:true
      // }
    });
    // console.log(fooodmenubydate[0].menu[1]);
    // console.log(Menu);

    const results = Menu.filter((r) => r.menu.length !== 0);
    // r.Menu.date == createdDate
    // console.log(r.menu)

    // console.log(results);

    let ID = results[0].menu[0].id;
    const menuu = await prisma.menu.update({
      where: {
        id: ID,
      },
      data: {
        date: createdDate,
        breakfast: [...breakfast],
        lunch: [...lunch],
        dinner: [...dinner],
      },
    });

    return res.status(201).json({
      status: true,
      data: menuu,
    });
  }
);

const ShowAllMenus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { Residentid, Date } = req.body;

    const Menus = await prisma.menu.findMany({
      include: {
        foodmenu: {
          include: {
            city: true,
          },
        },
      },
    });

    // console.log(Menus);

    // let createdDate = moment(Date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    // const menu = await prisma.foodmenu.findMany({
    //   where: {
    //     cityid: residents[0]?.cityId,
    //   },

    //   select: {
    //     menu: { where: { date: createdDate } },
    //   },
    // });

    // const results = menu.filter((r) => r.menu.length !== 0);

    // const dishes = await prisma.menu.findMany({
    //   where: {
    //     id: menu[0].id,

    //   },
    // });

    // console.log(Dishes);
    res.status(200).json({
      status: true,
      data: Menus,
    });
  }
);

const Deletemenu = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id } = req.body;

    const Menu = await prisma.menu.findFirst({
      where: {
        id: Id,
      },
    });
    const Foodmenuid = Menu?.foodmenuid;

    const Menuu = await prisma.menu.deleteMany({
      where: {
        id: Id,
      },
    });

    const FoodMenu = await prisma.foodmenu.deleteMany({
      where: {
        id: Foodmenuid,
      },
    });
    // console.log(Menu);

    // let createdDate = moment(Date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    // const menu = await prisma.foodmenu.findMany({
    //   where: {
    //     cityid: residents[0]?.cityId,
    //   },

    //   select: {
    //     menu: { where: { date: createdDate } },
    //   },
    // });

    // const results = menu.filter((r) => r.menu.length !== 0);

    // const dishes = await prisma.menu.findMany({
    //   where: {
    //     id: menu[0].id,

    //   },
    // });

    // console.log(Dishes);
    res.status(200).json({
      status: true,
      message: 'Deleted Sucessfully',
    });
  }
);

const showDishes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Residentid, date } = req.body;

    const residents = await prisma.resident.findFirst({
      where: {
        id: Residentid,
      },
    });

    let createdDate = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    const menu = await prisma.foodmenu.findMany({
      where: {
        cityid: residents?.cityId,
      },

      select: {
        menu: { where: { date: createdDate } },
      },
    });

    const results = menu.filter((r) => r.menu.length !== 0);

    // const dishes = await prisma.menu.findMany({
    //   where: {
    //     id: menu[0].id,

    //   },
    // });

    // console.log(Dishes);
    res.status(200).json({
      status: true,
      data: results,
    });
  }
);

const showDishesDates = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Residentid, date } = req.body;

    const residents = await prisma.resident.findFirst({
      where: {
        id: Residentid,
      },
    });
    

    let createdDate = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    const dates = await prisma.menu.findMany({
      where: {
        // date: {
        //   gte: createdDate,
        // },
        foodmenu: {
          cityid: residents?.cityId,
        },
      },
      select: {
        date: true,
        
      },
    });
   
    
    let findates = [];
    const fooddates = () => {
      for (let i = 0; i <= dates.length; i++) {
        let Datee = moment(dates[i].date, 'YYYY-MM-DD').format('DD-MM-YYYY');
       
        
        let Datess = new Date(Datee);
        findates.push(Datess);
        if (i == dates.length - 1) {
          
          
          return findates;
        }
      }
    };
    const Dates = await fooddates();
    
    // const results = menu.filter((r) => r.menu.length !== 0);

    // const dishes = await prisma.menu.findMany({
    //   where: {
    //     id: menu[0].id,

    //   },
    // });

    
    res.status(200).json({
      status: true,
      data: { dates: dates },
    });
  }
);

const exportfoodordersdata = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Residentid, date } = req.body;

    let Date = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // const residents = await prisma.userDishes.findFirst({
    //   where: {
    //     residentid: Residentid,
    //     date: createdDate,
    //   },
    // });
    // console.log(residents);

    const residentbreakfast = await prisma.resident.findMany({
      where: {
        id: Residentid,
      },
      select: {
        id: true,
        name: true,
        UserDishes: {
          where: {
            date: Date,
            foodtype: 'breakfast',
          },
          select: {
            dish: true,
            foodtype: true,
            user: {
              select: {
                name: true,
                RentPaymentSubcriptin: {
                  select: {
                    roomNo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const residentlunch = await prisma.resident.findMany({
      where: {
        id: Residentid,
      },
      select: {
        id: true,
        name: true,
        UserDishes: {
          where: {
            date: Date,
            foodtype: 'lunch',
          },
          select: {
            dish: true,
            foodtype: true,
            user: {
              select: {
                name: true,
                RentPaymentSubcriptin: {
                  select: {
                    roomNo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const residentdinner = await prisma.resident.findMany({
      where: {
        id: Residentid,
      },
      select: {
        id: true,
        name: true,
        UserDishes: {
          where: {
            date: Date,
            foodtype: 'dinner',
          },
          select: {
            dish: true,
            foodtype: true,
            user: {
              select: {
                name: true,
                RentPaymentSubcriptin: {
                  select: {
                    roomNo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const Breakfastdatas = async () => {
      let datas = [];
      for (let i = 0; i <= residentbreakfast.length; i++) {
        let data = {
          Date: date,
          Foodtype: 'breakfast',
          Residentname: residentbreakfast[i].name,
          Dish: residentbreakfast[i].UserDishes[0].dish,
          User: residentbreakfast[i].UserDishes[0].user.name,
          RoomNo:
            residentbreakfast[i].UserDishes[0].user.RentPaymentSubcriptin[0]
              .roomNo,
        };
        datas.push(data);
        if (i == residentbreakfast.length - 1) {
          return datas;
        }
      }
    };
    const Lunchdatas = async () => {
      let datas = [];
      for (let i = 0; i <= residentlunch.length; i++) {
        let data = {
          Date: date,
          Foodtype: 'lunch',
          Residentname: residentlunch[i].name,
          Dish: residentlunch[i].UserDishes[0].dish,
          User: residentlunch[i].UserDishes[0].user.name,
          RoomNo:
            residentlunch[i].UserDishes[0].user.RentPaymentSubcriptin[0].roomNo,
        };
        datas.push(data);
        if (i == residentlunch.length - 1) {
          return datas;
        }
      }
    };
    const Dinnerdatas = async () => {
      let datas = [];
      for (let i = 0; i <= residentdinner.length; i++) {
        let data = {
          Date: date,
          Foodtype: 'dinner',
          Residentname: residentdinner[i].name,
          Dish: residentdinner[i].UserDishes[0].dish,
          User: residentdinner[i].UserDishes[0].user.name,
          RoomNo:
            residentdinner[i].UserDishes[0].user.RentPaymentSubcriptin[0]
              .roomNo,
        };
        datas.push(data);
        if (i == residentdinner.length - 1) {
          return datas;
        }
      }
    };
    const breakdatas = await Breakfastdatas();
    const lunchdatas = await Lunchdatas();
    const dinnerdatas = await Dinnerdatas();

    const finaldata = await [...breakdatas, ...lunchdatas, ...dinnerdatas];
    // console.log(breakdatas);

    // let createdDate = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    // const menu = await prisma.menu.findMany({
    //   where: {
    //     // date: {
    //     //   gte: createdDate,
    //     // },
    //     foodmenu: {
    //       cityid: residents?.cityId,
    //     },
    //   },
    //   select: {
    //     date: true,
    //   },
    // });

    // const results = menu.filter((r) => r.menu.length !== 0);

    // const dishes = await prisma.menu.findMany({
    //   where: {
    //     id: menu[0].id,

    //   },
    // });

    // console.log(Dishes);
    res.status(200).json({
      status: true,
      data: finaldata,
    });
  }
);
const userdishes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      userid,
      residentid,
      date,
      breakfast,
      bkcount,
      lunch,
      luncount,
      dinner,
      dincount,
    } = req.body;
    // const newComment = await prisma.comment.create({
    //   data: {
    //     content: req.body.content,
    //     residentId: listingId,
    //     userId: req.user?.id as string,
    //   },
    // });
    // console.log(Residentid, date, dishes);

    let Date = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const Dishes1 = await prisma.userDishes.findMany({
      where: {
        date: Date,
        userid: userid,
        foodtype: 'breakfast',
      },
    });
    const Dishes2 = await prisma.userDishes.findMany({
      where: {
        date: Date,
        userid: userid,
        foodtype: 'lunch',
      },
    });
    const Dishes3 = await prisma.userDishes.findMany({
      where: {
        date: Date,
        userid: userid,
        foodtype: 'dinner',
      },
    });

    if (Dishes1.length !== 0 || Dishes2.length !== 0 || Dishes3.length !== 0) {
      return res.status(201).json({
        status: false,
        message:
          'Already food orderded for the same date ,edit it for changes .',
      });
    } else {
      const Dishess1 = await prisma.userDishes.create({
        data: {
          date: Date,
          userid: userid,
          residentid: residentid,
          foodtype: 'breakfast',
          dish: breakfast,
          quantity: 1,
        },
      });
      const Dishess2 = await prisma.userDishes.create({
        data: {
          date: Date,
          userid: userid,
          residentid: residentid,
          foodtype: 'lunch',
          dish: lunch,
          quantity: 1,
        },
      });
      const Dishess3 = await prisma.userDishes.create({
        data: {
          date: Date,
          userid: userid,
          residentid: residentid,
          foodtype: 'dinner',
          dish: dinner,
          quantity: 1,
        },
      });

      // console.log([Dishess1, Dishess2, Dishess3]);
      res.status(200).json({
        status: true,
        message: 'Dishes Ordered Sucessfully',
        data: [Dishess1, Dishess2, Dishess3],
      });
    }
  }
);

const showuserdishes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userid } = req.body;
    // const newComment = await prisma.comment.create({
    //   data: {
    //     content: req.body.content,
    //     residentId: listingId,
    //     userId: req.user?.id as string,
    //   },
    // });
    // console.log(Residentid, date, dishes);

    const Dishes = await prisma.userDishes.findMany({
      where: {
        userid: userid,
      },
    });

    // if (Dishes.length !== 0) {
    //   let ID = Dishes[0].id;
    //   const menuu = await prisma.userDishes.update({
    //     where: {
    //       id: ID,
    //     },
    //     data: {
    //       dish: dish,
    //       quantity: quantity,
    //     },
    //   });

    return res.status(201).json({
      status: true,
      data: Dishes,
    });
  }

  // console.log(Dishes);
);

const userdishesupdate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userid, Residentid, date, foodtype, dish, quantity } = req.body;
    // const newComment = await prisma.comment.create({
    //   data: {
    //     content: req.body.content,
    //     residentId: listingId,
    //     userId: req.user?.id as string,
    //   },
    // });
    // console.log(Residentid, date, dishes);

    let Date = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const Dishes = await prisma.userDishes.findMany({
      where: {
        date: Date,
        userid: userid,
        foodtype: foodtype,
      },
    });

    if (Dishes.length !== 0) {
      let ID = Dishes[0].id;
      const menuu = await prisma.userDishes.update({
        where: {
          id: ID,
        },
        data: {
          dish: dish,
          quantity: 1,
        },
      });

      return res.status(201).json({
        status: true,
        data: menuu,
        message: 'Updated',
      });
    }

    // console.log(Dishes);
    res.status(201).json({
      status: true,
      message: 'Order not found',
    });
  }
);

const showresdishes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Residentid, date } = req.body;
    // const newComment = await prisma.comment.create({
    //   data: {
    //     content: req.body.content,
    //     residentId: listingId,
    //     userId: req.user?.id as string,
    //   },
    // });
    // console.log(Residentid, date, dishes);
    let Date = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const Dishes = await prisma.userDishes.findMany({
      where: {
        residentid: Residentid,
        date: Date,
      },
    });

    // console.log(Dishes);
    res.status(201).json({
      status: true,
      data: Dishes,
    });
  }
);
const Residents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { Userid } = req.body;
    // const newComment = await prisma.comment.create({
    //   data: {
    //     content: req.body.content,
    //     residentId: listingId,
    //     userId: req.user?.id as string,
    //   },
    // });
    // console.log(Residentid, date, dishes);

    const residents = await prisma.rentPaymentSubcriptin.findMany({
      where: {
        userid: Userid,
      },
    });

    const Avalibility = await prisma.availAbility.findMany({
      where: {
        uid: residents[0]?.availabilityId,
      },
    });

    res.status(201).json({
      status: true,
      data: {
        Residentid: Avalibility[0].residentId,
      },
    });
  }
);

const Userupdateorder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, dish, quantity } = req.body;

    const menuu = await prisma.userDishes.update({
      where: {
        id: id,
      },
      data: {
        dish: dish,
        quantity: quantity,
      },
    });

    res.status(201).json({
      status: true,
      data: menuu,
      message: 'Order Updated Successfully',
    });
  }
);
const dishescountbyresanddateorder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, resId } = req.body;

    // const Id = await prisma.availAbility.findMany({
    //   where: {
    //     residentId: resId,
    //   },
    // });
    const menuu = await prisma.user.findMany({
      where: {},
    });

    res.status(201).json({
      status: true,
      data: menuu,
      message: 'Order Updated Successfully',
    });
  }
);
const Allordersbydate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, cityId } = req.body;
    

    // const Orders = await prisma.userDishes.findMany({
    //   where: {
    //     date: date,
    //   },
    //   include: {
    //     resident: {
    //       select: {
    //         name: true,
    //       },
    //     },
    //   },
    // });
    // const Orderss = await prisma.userDishes.groupBy({
    //   by: ['dish'],
    //   where: {
    //     date: date,
    //   },
    // });
    // const result = await prisma.userDishes.findMany({
    //   distinct: ['date', 'residentid'],
    //   // select: {
    //   //   dish: true,
    //   //   userid: true,
    //   // },
    // });

    // const residents = await prisma.resident.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //   },
    // });

    const residentbreakfast = await prisma.resident.findMany({
      where: {
        cityId: cityId,
      },
      select: {
        id: true,
        name: true,
        UserDishes: {
          where: {
            date: date,
            foodtype: 'breakfast',
          },
          select: {
            dish: true,
            foodtype: true,
            date: true,
            user: {
              select: {
                name: true,
                RentPaymentSubcriptin: {
                  select: {
                    roomNo: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const residentlunch = await prisma.resident.findMany({
      where: {
        cityId: cityId,
      },
      select: {
        id: true,
        name: true,
        UserDishes: {
          where: {
            date: date,
            foodtype: 'lunch',
          },
          select: {
            dish: true,
            foodtype: true,
            user: {
              select: {
                name: true,
                RentPaymentSubcriptin: {
                  select: {
                    roomNo: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const residentdinner = await prisma.resident.findMany({
      where: {
        cityId: cityId,
      },
      select: {
        id: true,
        name: true,
        UserDishes: {
          where: {
            date: date,
            foodtype: 'dinner',
          },
          select: {
            dish: true,
            foodtype: true,
            user: {
              select: {
                name: true,
                RentPaymentSubcriptin: {
                  select: {
                    roomNo: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    //  const Dishes = await prisma.userDishes.groupBy({
    //    by: ['dish'],
    //    where: {
    //      resident: {
    //        cityId: cityId,
    //      },
    //    },
    //  });

    //  let finaldata = [];
    //  const datacount = Dishes.map(async (r, i) => {
    //    const data = await prisma.userDishes.findMany({
    //      where: {
    //        date: date,
    //        dish: r.dish,
    //      },
    //    });
    //    let element = {
    //      count: data.length,
    //      dish: r.dish,
    //    };
    //    console.log(element);

    //    finaldata.push(element);
    //  });

    //  const groupUsers = await prisma.userDishes.groupBy({
    //    by: ['dish', 'foodtype'],
    //    where: {
    //      date: date,
    //      resident: {
    //        cityId: cityId,
    //      },
    //    },
    //    _sum: {
    //      quantity: true,
    //    },
    //  });

    const Breakfastcount = await prisma.userDishes.groupBy({
      by: ['residentid', 'dish'],
      where: {
        date: date,
        foodtype: 'breakfast',
      },
      _sum: {
        quantity: true,
      },
    });
    const breakfastcount = { Breakfastcount };
    const Lunchcount = await prisma.userDishes.groupBy({
      by: ['dish'],
      where: {
        date: date,
        foodtype: 'lunch',
        resident: {
          cityId: cityId,
        },
        //   select: {
        //     resident: {
        //       id: true,
        //       name: true,
        //     },
        //   },
        // },
        // include: {},
      },
      _sum: {
        quantity: true,
      },
    });
    const lunchcount = { Lunchcount };
    const Dinnercount = await prisma.userDishes.groupBy({
      by: ['dish'],
      where: {
        date: date,
        foodtype: 'dinner',
        resident: {
          cityId: cityId,
        },
      },
      _sum: {
        quantity: true,
      },
    });
    const dinnercount = { Dinnercount };
    // let finorders = [];
    // const data = residents.map(async (r) => {
    //   const Orderss = await prisma.userDishes.findMany({
    //     where: {
    //       id: r.id,
    //     },
    //   });
    //   return finorders.push(Orderss);
    // });
    // console.log(finorders);

    // const Residents = await prisma.userDishes.findMany({
    //   select: {
    //     residentid: true
    //   }

    // });
    // console.log(Residents);
    // const Uniqueres = Array.from(new Set(Residents));

    // console.log(Uniqueres);

    // const Orders = await prisma.userDishes
    //   .groupBy({
    //     by: ['residentid'],
    //     where: {
    //       date: date,
    //     },
    //   })
    // let orders = []
    // const Finalorders = await Orders.map(async (r, i) => {
    //  const data = await prisma.userDishes.findMany({
    //     where: { residentid: r.residentid },
    //  });
    //   console.log({ ...r, data });

    //   return { ...r , data };
    //   })

    // const aggregate = await prisma.userDishes.findMany({
    //   where: {
    //     date: date,
    //   },
    // });
    // const residents = await prisma.resident.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //   },
    // });
    // let final = [];
    // const summary = [];
    // for (let i = 0; i < residents.length; i++) {
    //   for (let j = 0; j < aggregate.length; j++) {
    //     if (residents[i].id == aggregate[j].residentid) {
    //       let element = {
    //         ...aggregate[j],
    //         residentname: residents[i].name,
    //       };
    //       summary.push(element);
    //     }
    //   }
    //   let Name = residents[i].name;
    //   // console.log(Name);

    //   let element =
    //      [...summary]

    //   final.push(element);
    // }

    res.status(201).json({
      status: true,
      data: {
        residentbreakfast,
        residentlunch,
        residentdinner,
      },
      countdata: { Breakfastcount, Lunchcount, Dinnercount },
      // data: finorders,
      // residents: residents,
      message: 'Orders fetched Successfully',
    });
  }
);
const dishescountbydateandres = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, resId } = req.body;
    // try {
    const breakfast = await prisma.userDishes.findMany({
      where: {
        residentid: resId,
        date: date,
        foodtype: 'breakfast',
      },
      select: {
        dish: true,
        user: {
          select: {
            name: true,
            RentPaymentSubcriptin: {
              select: {
                roomNo: true,
              },
            },
          },
        },
      },
    });

    const lunch = await prisma.userDishes.findMany({
      where: {
        residentid: resId,
        date: date,
        foodtype: 'lunch',
      },
      select: {
        dish: true,
        user: {
          select: {
            name: true,
            RentPaymentSubcriptin: {
              select: {
                roomNo: true,
              },
            },
          },
        },
      },
    });
    const dinner = await prisma.userDishes.findMany({
      where: {
        residentid: resId,
        date: date,
        foodtype: 'dinner',
      },
      select: {
        dish: true,
        user: {
          select: {
            name: true,
            RentPaymentSubcriptin: {
              select: {
                roomNo: true,
              },
            },
          },
        },
      },
    });

    // const orders = await prisma.userDishes.groupBy({
    //   by: ['foodtype', 'dish'],
    //   where: {
    //     residentid: resId,
    //     date: date,
    //   },
    // });

    // let finArray: {
    //   breakfast?: {
    //     user: { name: string; RentPaymentSubcriptin: { roomNo: string }[] };
    //   }[];
    //   lunch?: {
    //     user: { name: string; RentPaymentSubcriptin: { roomNo: string }[] };
    //   }[];
    //   dinner?: {
    //     user: { name: string; RentPaymentSubcriptin: { roomNo: string }[] };
    //   }[];
    // }[] = [];
    // let Breakfast: {
    //   user: { name: string; RentPaymentSubcriptin: { roomNo: string }[] };
    // }[][] = [];
    // let Dinner: {
    //   user: { name: string; RentPaymentSubcriptin: { roomNo: string }[] };
    // }[][] = [];
    // let Lunch: {
    //   user: { name: string; RentPaymentSubcriptin: { roomNo: string }[] };
    // }[][] = [];
    // const orderst = await orders.map(
    //   async (r, i) => {

    //     const data = await prisma.userDishes.findMany({
    //       where: {
    //         residentid: resId,
    //         date: date,
    //         foodtype: r.foodtype,
    //         dish: r.dish,
    //       },

    //       select: {
    //         dish: true,
    //         user: {
    //           select: {
    //             name: true,
    //             RentPaymentSubcriptin: {
    //               select: {
    //                 roomNo: true,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     });
    //     if (r.foodtype === 'breakfast') {
    //       let element = {
    //         breakfast: data,
    //         dish: r.dish,
    //       };
    //       // console.log(data);

    //       let Breakfast = [...data];
    //       console.log(Breakfast);

    //     } else if (r.foodtype === 'lunch') {
    //       // let element = {
    //       //   lunch: data,
    //       // };

    //       let Lunch = [...data];
    //       // Lunch.push(...data);
    //       // finArray.push(element);
    //     } else if (r.foodtype === 'dinner') {
    //       // let element = {
    //       //   dinner: data,
    //       // };

    //       // Dinner.push(...data);
    //       let Dinner = [...data];
    //       // finArray.push(element);
    //     }
    //     //  return finArray;
    //   }

    //   // console.log(orderst)
    // );
    // console.log(orderst);
    // if () {
    //   res.status(201).json({
    //     status: true,
    //     data: { Breakfast, Lunch, Dinner },
    //     message: 'Order data send',
    //   });
    // }
    res.status(201).json({
      status: true,
      data: { breakfast, lunch, dinner },
      message: 'Order data send',
    });
    // } catch (error) {
    //   res.status(402).json({
    //     status: false,

    //     message: 'Order data not available',
    //   });
    // }
  }
);
const dishescountbydate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { date, cityId } = req.body;

    // const menuu = await prisma.foodmenu.findFirst({

    //     where: {
    //      cityid: cityId,
    //   },
    //   select: {
    //     menu: {
    //       where: {
    //         date: date,
    //       },
    //     },
    //   },
    // });

    const Dishes = await prisma.userDishes.groupBy({
      by: ['dish'],
      where: {
        resident: {
          cityId: cityId,
        },
      },
    });

    let finaldata = [];
    const datacount = Dishes.map(async (r, i) => {
      const data = await prisma.userDishes.findMany({
        where: {
          date: date,
          dish: r.dish,
        },
      });
      let element = {
        count: data.length,
        dish: r.dish,
      };
     

      finaldata.push(element);
    });

    const groupUsers = await prisma.userDishes.groupBy({
      by: ['dish', 'foodtype'],
      where: {
        date: date,
        resident: {
          cityId: cityId,
        },
      },
      _sum: {
        quantity: true,
      },
    });
    // const groupUsers = await prisma.resident.findMany({
    //   select: {
    //     UserDishes: {
    //       where: {
    //         date: date,
    //       },
    //     },
    //   },
    // });
    // const categories = await prisma.budget.findMany({
    //   where: {
    //     userId: user.id,
    //   },
    //   select: {
    //     id: true,
    //     category: true,
    //   },
    // });
    // const summary = [];
    // for (let i = 0; i < aggregate.length; i++) {
    //   for (let j = 0; j < categories.length; j++) {
    //     if (aggregate[i].category_id == categories[j].id) {
    //       let element = {
    //         ...aggregate[i],
    //         category: categories[j].category,
    //       };
    //       summary.push(element);
    //     }
    //   }
    // }

    res.status(201).json({
      status: true,
      data: { groupUsers, finaldata },
      message: 'Order Updated Successfully',
    });
  }
);

export default {
  addDishes,
  updateDishes,
  showDishes,
  showDishesDates,
  userdishes,
  showuserdishes,
  userdishesupdate,
  showresdishes,
  Residents,
  ShowAllMenus,
  Deletemenu,
  exportfoodordersdata,
  Userupdateorder,
  Allordersbydate,
  dishescountbydate,
  dishescountbydateandres,
  dishescountbyresanddateorder,
};
