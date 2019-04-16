<template>
  <aside class="col-lg-3  order-lg-1 sidebar">
          <div class="sidebar-filter">
            <form>
              <fieldset class="form-group ">
                <legend>Device type</legend>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="opt1" id="opt1" value="opt1">
                  <label class="form-check-label" for="opt1">
                    Ноутбук
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="opt2" id="opt2" value="opt2">
                  <label class="form-check-label" for="opt2">
                    Планшет
                  </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="opt3" id="opt3" value="opt3">
                    <label class="form-check-label" for="opt3">
                      Смартфон
                    </label>
                </div>
              
              </fieldset>
  
              <fieldset class="form-group">
                <legend>Color</legend>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="opt3" id="opt3" value="opt3">
                  <label class="form-check-label" for="opt3">
                    Black
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="opt4" id="opt4" value="opt4">
                  <label class="form-check-label" for="opt4">
                    Red
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="opt5" id="opt5" value="opt5">
                  <label class="form-check-label" for="opt5">
                    Green
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="opt6" id="opt6" value="opt6">
                  <label class="form-check-label" for="opt6">
                    Blue
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="opt7" id="opt7" value="opt7">
                  <label class="form-check-label" for="opt7">
                    Orange
                  </label>
                </div>
              </fieldset>
  
        
              <a href="#" class="sidebar-filter__more">Show more options...</a>
              
              <button type="submit" class="btn btn-success btn-block sidebar-filer__submit">Submit</button>

            </form>
          </div>
  
    </aside>
</template>

<script>
export default {

}
</script>

<style scoped>
aside{
    background:brown;
}
.sidebar-filter{
    padding: 15px 30px 30px;

}

.sidebar-filter__more{
    display: block;
    color:black;
    margin-bottom: 30px;
    font-size: 1.25rem;
}


.sidebar-filer__submit{
    border: 1px solid #ffffff;
    border-radius: 0;
    background-color: #2c71b6;
}

</style>
