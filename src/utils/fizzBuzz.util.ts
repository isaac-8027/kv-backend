class FizzBuzz{
    public fizzBuzz(num){
        if(num%15==0){
            return "FizzBuzz";
        }
        else if(this.divisiblebyThree(num)){
            return "Fizz"

        }
        else if(num%5 ==0){
            return "Buzz"
        }
        return num;
    }

    divisiblebyThree = (num:number): boolean  => num %3==0;

}


export default FizzBuzz