const slime = {
  name: "슬라임"
};

// const cuteSlime = {
//   name: "슬라임",
//   attribute: "cute"
// };

const cuteSlime = {
  ...slime,
  attribute: "cute"
};


const purpleCuteSlime = {
  ...cuteSlime, //복제
  color: "purple",
  name: "slime" //name값이 slime
};
console.log(purpleCuteSlime);
// const purpleCuteSime = {
//   name: "슬라임",
//   attribute: "cute",
//   color: "purple",
//   name: "slime"
// };


// 배열 spread

const nums = [1,2,3,4,5];
const nums2 = [...nums, 6,7,8,9,10]; //배열안에 들어있는 요소들을 복사해서 들고옴.
const nums3 = [...(nums2.filter(n => n % 2 === 0)), 11,12,13,14,15];

// console.log(nums);
// console.log(nums2);
// console.log(nums3);

const users = [
  {
    id: 1,
    name: "김준일"
  },
  {
    id: 2,
    name: "김준이"
  },
  {
    id: 3,
    name: "김준삼"
  },
  {
    id: 4,
    name: "김준사"
  },
];//객체 배열

const evenUsers = [...users.filter(user => user.id % 2 === 0), { id:5, name:"김준오" }];
//객체 추가 가능
console.log(evenUsers);
//spread는 비구조할당으로 뿌려줄 같이씀.

//리액트 사용시 코드 어떻게 사용할지가 보임.