import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('useEmployeeStore', {
  state: () => ({
    employees: <any>[],
    teamLeadEmployees: <any>[],
    branchs: <any>[],
  }),
  getters: {},
  actions: {
    async getEmployeesList() {
      this.employees = [
        {
          employee_code: 'VHEC0001',
          branch: 'Can Tho :v',
          full_name: 'Lam Chan V',
          initial_name: 'vulam',
          current_group: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          state: 1,
          company_email: 'cemail@mail.com',
          personal_email: 'pemail@mail.com',
          phone: '0123456789',
          birthday: '2022-01-01T00:00:00',
          permanent_address: 'dia chi nha',
          current_address: 'dia chi hien tai',
          id_number: '084202009999',
          date_issue: '2019-12-02T00:00:00',
          location_issue: 'Tra Vinh',
          is_married: false,
          timesheets: null,
          employeeDepartments: null,
          employeePositions: null,
          id: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          created_at: '2000-01-01T00:00:00',
          created_by: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          updated_at: '2000-01-01T00:00:00',
          updated_by: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          del_flg: false,
        },
        {
          employee_code: 'VHEC0002',
          branch: 'Can Tho :v',
          full_name: 'Lam Chan V2',
          initial_name: 'vulam2',
          current_group: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          state: 1,
          company_email: 'cemail@mail.com2',
          personal_email: 'pemail@mail.com2',
          phone: '01234567892',
          birthday: '2022-01-01T00:00:00',
          permanent_address: 'dia chi nha2',
          current_address: 'dia chi hien tai2',
          id_number: '084202009992',
          date_issue: '2019-12-02T00:00:00',
          location_issue: 'Tra Vinh',
          is_married: false,
          timesheets: null,
          employeeDepartments: null,
          employeePositions: null,
          id: 'd1a1c9d2-902d-435e-a2c7-1961c04b6948',
          created_at: '2000-01-01T00:00:00',
          created_by: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          updated_at: '2000-01-01T00:00:00',
          updated_by: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          del_flg: false,
        },
      ]
    },
    async getTeamLeadEmployeesList() {
      this.teamLeadEmployees = [
        {
          employee_code: 'VHEC0001',
          branch: 'Can Tho :v',
          full_name: 'Lam Chan V',
          initial_name: 'vulam',
          current_group: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          state: 1,
          company_email: 'cemail@mail.com',
          personal_email: 'pemail@mail.com',
          phone: '0123456789',
          birthday: '2022-01-01T00:00:00',
          permanent_address: 'dia chi nha',
          current_address: 'dia chi hien tai',
          id_number: '084202009999',
          date_issue: '2019-12-02T00:00:00',
          location_issue: 'Tra Vinh',
          is_married: false,
          timesheets: null,
          employeeDepartments: null,
          employeePositions: null,
          id: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          created_at: '2000-01-01T00:00:00',
          created_by: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          updated_at: '2000-01-01T00:00:00',
          updated_by: 'd1a1c9d2-902d-435e-a2c7-1961c04b6947',
          del_flg: false,
        },
      ]
    },
    async getBranchsList() {
      this.branchs = ['Branch 1', 'Branch 2', 'Branch 3']
    },
  },
})
