pipeline {
    agent any

    environment {
        IMAGE_NAME = 'gunha0405/k8s_front'
        IMAGE_TAG = "${BUILD_NUMBER}"
        DEPLOY_SERVER = "test@192.0.2.7"  // 배포 서버 SSH 정보
        DEPLOY_PATH = "/var/www/html/"  // Vue 빌드 결과를 배포할 경로
    }

    stages {
        stage('Git Clone') {
            steps {
                echo 'Cloning Repository'
                git branch : 'main', url: 'https://github.com/gunha0405/ogh_test_frontend'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Vue App') {
            steps {
                echo 'Building Vue App...'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'jenkins-k8s-prac']) {
                        docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'k8s',
                                verbose: true,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'k8s/frontend-deployment.yml',
                                        remoteDirectory: '/',
                                        execCommand: '''
                                            sed -i "s/latest/$BUILD_ID/g" k8s/frontend-deployment.yml
                                        '''
                                    ),
                                    sshTransfer(
                                        execCommand: '''
                                            kubectl apply -f /home/test/k8s/frontend-deployment.yml
                                        '''
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}
