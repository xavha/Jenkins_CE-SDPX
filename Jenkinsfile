pipeline{
    agent{
        label 'vm2' 
    }
    stages{
        stage('Clone'){
            steps{
                git branch: 'main',url: 'https://github.com/xavha/Jenkins_CE-SDPX.git'
            }
        }
        stage('Install Packages'){
            steps{
                sh 'npm i'
            }
        }
        stage('Run unit-test'){
            steps{
                sh 'npm test'
            }
        }
        stage('Created images'){
            steps{
                sh 'docker compose -f ./docker-compose.dev.yaml up -d --build' 
            }
        }
        stage('Clone Robot Framework'){
            steps{
                dir('./robot/'){
                    git branch: 'main',url: 'https://github.com/xavha/Jenkins_CE-SDPX_test.git'
                }
            }
        }
        stage('Run Robot'){
            steps{
                sh 'cd robot && python3 -m robot test_api.robot'
            }
        }
        stage('Create images'){
            steps{
                sh 'docker build -t xavha/jenkins:lastest .'
            }
        }
        stage('Push images'){
            steps{
                sh 'docker push xavha/jenkins:lastest'
            }
        }
        stage('Clear system'){
            steps{
                sh 'docker compose -f ./docker-compose.dev.yaml down && docker system prune -a -f'
            }
        }
        stage('Pull image'){
            agent{
                label 'vm3'
            }
            steps{
                sh 'docker compose down && docker system prune -a -f && docker compose up -d --build'
            }
        }
    }
}