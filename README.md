# DeShawn's Dog Walking

**ERD**

Table dogs {
  id int pk
  name varchar
  cityId varchar
  walkerId int
}

Table cities {
  id int pk
  name varchar
}

Table walkers {
  id int pk
  name varchar
}

Table walkersToCities {
  id int pk
  walkerId int
  cityId int
}


Ref: "walkers"."id" < "dogs"."walkerId"
Ref: "cities"."id" < "dogs"."cityId"
Ref: "walkers"."id" < "walkersToCities"."walkerId"
Ref: "cities"."id" < "walkersToCities"."cityId"`