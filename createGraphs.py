import pandas as pd
import matplotlib.pyplot as plt
import os

plt.rcParams['font.sans-serif'] = ['Yu Gothic']
plt.rcParams['axes.unicode_minus'] = False

INPUT_DIR = './output'
OUTPUT_DIR = './output'

def plot_histogram(filename, title, xlabel, ylabel):
    df = pd.read_csv(f"{INPUT_DIR}/{filename}")
    plt.figure(figsize=(10, 6))
    plt.bar(df.iloc[:, 0].astype(str), df.iloc[:, 1])
    plt.title(title, fontsize=16)
    plt.xlabel(xlabel, fontsize=12)
    plt.ylabel(ylabel, fontsize=12)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/{filename.replace('.csv', '.png')}")
    plt.close()

def plot_line_chart(filename, title, y_cols):
    df = pd.read_csv(f"{INPUT_DIR}/{filename}")
    plt.figure(figsize=(12, 6))
    
    for col in y_cols:
        plt.plot(df['n'], df[col], label=col)
        
    plt.title(title, fontsize=16)
    plt.xlabel('n (サンプルサイズ)', fontsize=12)
    plt.ylabel('値', fontsize=12)
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/{filename.replace('.csv', '.png')}")
    plt.close()

def main():
    if not os.path.exists(INPUT_DIR):
        print(f"エラー: 入力ディレクトリ'{INPUT_DIR}'が見つかりません。")
        print("先にTypeScriptスクリプトを実行してCSVファイルを生成してください。")
        return

    print("🚀 グラフ生成を開始します...")
    
    # ヒストグラム
    plot_histogram('p1-2_exponential_hist.csv', '問題1-2: 指数分布(λ=2)のヒストグラム', '乱数の区間', '生成数')
    plot_histogram('p1-3_pareto_hist.csv', '問題1-3: パレート分布(a=2, x₀=1)のヒストグラム', '乱数の区間', '生成数')
    plot_histogram('p2_normal_hist.csv', '問題2: N(2, 7)のヒストグラム', '乱数の区間', '生成数')
    plot_histogram('p3_poisson_hist.csv', '問題3: ポアソン分布(λ=1.62)のヒストグラム', 'Xの値', '生成数')

    # 折れ線グラフ
    plot_line_chart(
        'p1-4_p1-5_pareto_lln.csv', 
        '問題1-4 & 1-5: 大数の法則とサンプル分散',
        ['サンプル平均', 'サンプル分散']
    )
    
    print("\n🎉 全てのグラフが`output`フォルダにPNGファイルとして保存されました。")

if __name__ == '__main__':
    main()