<template>
  <div class="employee">
    <el-table
      :data="users.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Имя">
        <template slot-scope="scope" >
          <div @dblclick="editTitleMode(scope.row)" v-show="!scope.row.edit_mode">
            {{ scope.row.name }}
          </div>
          <div v-show="scope.row.edit_mode">
              <input v-model="scope.row.name" @keyup.enter="saveItemTitle(scope.row, scope.$index)"
                                              @focusout="saveItemTitle(scope.row, scope.$index)" type="text" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Фамилия">
        <template slot-scope="scope">
          <div @dblclick="editTitleMode(scope.row)" v-show="!scope.row.edit_mode">
            {{ scope.row.surname }}
          </div>
          <div v-show="scope.row.edit_mode">
              <input v-model="scope.row.surname" @keyup.enter="saveItemTitle(scope.row, scope.$index)"
                                                 @focusout="saveItemTitle(scope.row, scope.$index)" type="text" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Отчество">
        <template slot-scope="scope">
          <div @dblclick="editTitleMode(scope.row)" v-show="!scope.row.edit_mode">
            {{ scope.row.middle_name }}
          </div>
          <div v-show="scope.row.edit_mode">
              <input v-model="scope.row.middle_name" @keyup.enter="saveItemTitle(scope.row, scope.$index)" 
                                                     @focusout="saveItemTitle(scope.row, scope.$index)" type="text" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Почта">
        <template slot-scope="scope">
          <div @dblclick="editTitleMode(scope.row)" v-show="!scope.row.edit_mode"> 
            {{ scope.row.email }}
          </div>
          <div v-show="scope.row.edit_mode">
              <input v-model="scope.row.email" @keyup.enter="saveItemTitle(scope.row, scope.$index)" 
                                               @focusout="saveItemTitle(scope.row, scope.$index)" type="email" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Фото">
        <template slot-scope="scope">
          <div @dblclick="editTitleMode(scope.row)" v-show="!scope.row.edit_mode">
            {{ scope.row.photo }}
          </div>
          <div v-show="scope.row.edit_mode">
              <input v-model="scope.row.photo" @keyup.enter="saveItemTitle(scope.row, scope.$index)" 
                                               @focusout="saveItemTitle(scope.row, scope.$index)" type="text" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Офис">
        <template slot-scope="scope">
          <div @dblclick="editTitleMode(scope.row)" v-show="!scope.row.edit_mode">
            {{ scope.row.office_id }}
          </div>
          <div v-show="scope.row.edit_mode">
              <input v-model="scope.row.office_id" @keyup.enter="saveItemTitle(scope.row, scope.$index)"
                     @focusout="saveItemTitle(scope.row, scope.$index)" type="text" />
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <button @click="deleteUser(scope.$index)">Удалить</button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-user">
      <div class="group">
        <label> Имя *</label>
        <input type="text" v-model="name">
      </div>
      <div class="group">
        <label> Фамилия *</label>
        <input type="text" v-model="surname">
      </div>
      <div class="group">
        <label> Почта *</label>
        <input type="email" v-model="email">
      </div>
      <div class="group">
        <label> Офис *</label>
        <input type="text" v-model="office_id">
      </div>
      <div class="err" v-if="showErr">Необходимо заполнить поля Имя, Фамилия, Почта и Офис</div>
      <div class="err" v-if="error">{{error}}</div>
      <button @click="addUser">Добавить</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserAdd',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      office_id: '',
      showErr: false
    }
  },
  computed: {
    users() {
      console.log(this.$store.getters.getEmployees)
      return this.$store.getters.getEmployees;
    },
    error() {
      return this.$store.getters.getError;
    }
  },
  methods: {
    editTitleMode(item) {
        this.$set(item, 'edit_mode', true);
        
    },
    saveItemTitle (item, index) {
        // Do the saving
        console.log(item, index);
        let oldEmail = this.users.data[index].email;
        this.$store.dispatch("changeEmployeeData", {item, oldEmail});
        item.edit_mode = false;
    },
    addUser() {
      // console.log(this.name)
      console.log(document.getElementsByTagName("input"));
      if(this.name && this.surname && this.email && this.office_id) {
        this.showErr = false;
        let data = {
          name: this.name,
          surname: this.surname,
          email: this.email,
          office_id: this.office_id
        };
        this.$store.dispatch("addEmployee", data);
        if (!this.error) {
          console.log(123);
          document.getElementsByTagName("input").value = "";
        }
        let pushData = 
        this.users.data.push(data);
      }
    },
    async deleteUser(index) {
      let data = {
        id: this.users.data[index].id,
        office_id: this.users.data[index].office_id
      }
      await this.$store.dispatch("deleteEmployee", data);
      this.users.data.splice(index, 1);
    }
  },
  async mounted() {
    let office = 1;
    await this.$store.dispatch("fetchEmployees", office);
  }
}
</script>

<style scoped>
  .add-user {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-top: 80px;
    /* justify-content: center;
    align-items: center; */
  }
  .group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  .group input {
    max-width: 430px;
  }
  .add-user button{
    margin-top: 10px;
    max-width: 430px;
    min-height: 30px;
    /* align-self: center; */
  }
  .err {
    color: red;
  }
</style>

