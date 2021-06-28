#!/bin/sh

# 定义变量，当前分支
CURRENT_BRANCH=$(git symbolic-ref --short -q HEAD)

# 目标分支，即把当前分支合并到此分支
TARGET_BRANCH=$1

function checkGitStatus {
    STR1="nothing to commit, working tree clean"
    STR2="no changes added to commit"
    STR3="Changes not staged for commit"
    STR4="Changes to be committed"
    STR5="both modified: "
    STR6="Untracked files:"
    OUTTYPE=-1
    out=$(git status)
    result=$(echo $out | grep "$STR5")
    if [[ "$result" != "" ]];then
        OUTTYPE=5
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR1")
        if [[ "$result" != "" ]];then
            OUTTYPE=1
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR6")
        if [[ "$result" != "" ]];then
            OUTTYPE=6
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR2")
        if [[ "$result" != "" ]];then
            OUTTYPE=2
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR3")
        if [[ "$result" != "" ]];then
            OUTTYPE=3
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR4")
        if [[ "$result" != "" ]];then
            OUTTYPE=4
        fi
    fi
    if [ "$OUTTYPE" == "-1" ];then
        result=$(echo $out | grep "$STR5")
        if [[ "$result" != "" ]];then
            OUTTYPE=5
        fi
    fi
    if [ "$OUTTYPE" == "1" ];then
        git status
        if [ -n "$TARGET_BRANCH" ]; then
            echo -e "\033[32m切换到 $TARGET_BRANCH 分支：git checkout $TARGET_BRANCH\033[0m"
            git checkout $TARGET_BRANCH
            echo -e "\033[32m拉取 $TARGET_BRANCH 最新代码：git pull origin $TARGET_BRANCH\033[0m"
            ret=$(git pull origin $TARGET_BRANCH)
            kstr="conflicts" #冲突
            result=$(echo $ret | grep "$kstr")
            if [[ "$result" != "" ]];then
                rm -rf report.*
                echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
                exit 2
            fi

            echo -e "\033[32m切换到 $CURRENT_BRANCH 分支：git checkout $CURRENT_BRANCH\033[0m"
            git checkout $CURRENT_BRANCH
            echo -e "\033[32m把 $TARGET_BRANCH 分支合并到 $CURRENT_BRANCH 分支：git merge $TARGET_BRANCH\033[0m"
            ret=$(git merge $TARGET_BRANCH)
            kstr="conflicts" #冲突
            result=$(echo $ret | grep "$kstr")
            if [[ "$result" != "" ]];then
                rm -rf report.*
                echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
                exit 2
            fi
            echo -e "\033[32m推送至远程 $CURRENT_BRANCH 分支：git push -u origin $CURRENT_BRANCH\033[0m"
            rm -rf report.*
            git push -u origin $CURRENT_BRANCH
            echo -e "\033[32m切换到 $TARGET_BRANCH 分支：git checkout $TARGET_BRANCH\033[0m"
            git checkout $TARGET_BRANCH
            echo -e "\033[32m把 $CURRENT_BRANCH 分支合并到 $TARGET_BRANCH 分支：git merge $CURRENT_BRANCH\033[0m"
            ret=$(git merge $CURRENT_BRANCH)
            kstr="conflicts" #冲突
            result=$(echo $ret | grep "$kstr")
            if [[ "$result" != "" ]];then
                rm -rf report.*
                echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
                exit 2
            fi
            echo -e "\033[32m推送至远程 $TARGET_BRANCH 分支：git push -u origin $TARGET_BRANCH\033[0m"
            rm -rf report.*
            git push -u origin $TARGET_BRANCH
            echo -e "\033[32m切换到 $CURRENT_BRANCH 分支：git checkout $CURRENT_BRANCH\033[0m"
            git checkout $CURRENT_BRANCH
            echo -e "\033[32m查询当前状态：git status\033[0m"
            git status
            echo -e "\033[32m $CURRENT_BRANCH 分支合并到 $TARGET_BRANCH 分支操作成功，退出脚本\033[0m"
            exit 2
        else
            echo -e "\033[32m请输入目标分支\033[0m"
            read commitStr
            TARGET_BRANCH=$commitStr
            echo -e "\033[32m切换到 $TARGET_BRANCH 分支：git checkout $TARGET_BRANCH\033[0m"
            git checkout $TARGET_BRANCH
            echo -e "\033[32m拉取 $TARGET_BRANCH 最新代码：git pull origin $TARGET_BRANCH\033[0m"
            ret=$(git pull origin $TARGET_BRANCH)
            kstr="conflicts" #冲突
            result=$(echo $ret | grep "$kstr")
            if [[ "$result" != "" ]];then
                rm -rf report.*
                echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
                exit 2
            fi

            echo -e "\033[32m切换到 $CURRENT_BRANCH 分支：git checkout $CURRENT_BRANCH\033[0m"
            git checkout $CURRENT_BRANCH
            echo -e "\033[32m把 $TARGET_BRANCH 分支合并到 $CURRENT_BRANCH 分支：git merge $TARGET_BRANCH\033[0m"
            ret=$(git merge $TARGET_BRANCH)
            kstr="conflicts" #冲突
            result=$(echo $ret | grep "$kstr")
            if [[ "$result" != "" ]];then
                rm -rf report.*
                echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
                exit 2
            fi
            echo -e "\033[32m推送至远程 $CURRENT_BRANCH 分支：git push -u origin $CURRENT_BRANCH\033[0m"
            rm -rf report.*
            git push -u origin $CURRENT_BRANCH
            echo -e "\033[32m切换到 $TARGET_BRANCH 分支：git checkout $TARGET_BRANCH\033[0m"
            git checkout $TARGET_BRANCH
            echo -e "\033[32m把 $CURRENT_BRANCH 分支合并到 $TARGET_BRANCH 分支：git merge $CURRENT_BRANCH\033[0m"
            ret=$(git merge $CURRENT_BRANCH)
            kstr="conflicts" #冲突
            result=$(echo $ret | grep "$kstr")
            if [[ "$result" != "" ]];then
                rm -rf report.*
                echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
                exit 2
            fi
            echo -e "\033[32m推送至远程 $TARGET_BRANCH 分支：git push -u origin $TARGET_BRANCH\033[0m"
            rm -rf report.*
            git push -u origin $TARGET_BRANCH
            echo -e "\033[32m切换到 $CURRENT_BRANCH 分支：git checkout $CURRENT_BRANCH\033[0m"
            git checkout $CURRENT_BRANCH
            echo -e "\033[32m查询当前状态：git status\033[0m"
            git status
            echo -e "\033[32m $CURRENT_BRANCH 分支合并到 $TARGET_BRANCH 分支操作成功，退出脚本\033[0m"
            exit 2
        fi
    elif [ "$OUTTYPE" = "2" ]||[ "$OUTTYPE" = "6" ];then #
        git status
        rm -rf report.*
        echo -e "\033[31m发现有修改，退出手动处理\033[0m"
        exit 2
    elif [ "$OUTTYPE" = "3" ];then
        git status
        rm -rf report.*
        echo -e "\033[31m发现有修改，退出手动处理\033[0m"
        exit 2
    elif [ "$OUTTYPE" = "4" ];then
        git status
        rm -rf report.*
        echo -e "\033[31m发现有修改，退出手动处理\033[0m"
        exit 2
    elif [ "$OUTTYPE" = "5" ];then
        git status
        rm -rf report.*
        echo -e "\033[31m发现冲突！第一步手动解决冲突，第二步执行：git commit -a -m "\'备注\'"\033[0m"
        exit 2
    fi
}

while true;
do
    checkGitStatus
done
